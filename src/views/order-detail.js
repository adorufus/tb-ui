import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Container,
  ListGroup,
  Dropdown,
  Image,
} from "react-bootstrap";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../utils/utils";

export default function OrderDetail() {
  const navigate = useNavigate()
  const { productId } = useParams();
  const [productData, setProductData] = useState({});
  const [priceTotal, setPriceTotal] = useState(0);
  const [transactionFinished, setTransactionFinished] = useState(false);
  const [transactionData, setTransactionData] = useState({});

  const [transactionType, setTransactionType] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedTransactionType, setSelectedTransactionType] = useState(
    "Pilih Tipe Pembayaran"
  );
  const [loading, setLoading] = useState(true);
  const currentUser = getCurrentUser();
  async function getData() {
    setLoading(true);
    try {
      console.log("hit");
      const response = await fetch(
        `http://localhost:8000/api/produk/by-id/${productId}`,
        {
          method: "GET",
        }
      );

      let actualData = await response.json();

      console.log(actualData);

      setPriceTotal(actualData.data.price_product);

      setProductData(actualData);
    } catch (e) {
      console.log(e);
    }
  }

  async function doTransaction(e) {
    // e.preventDefault();
    const transaction = await fetch("http://localhost:8000/api/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id_product: productId,
        id_user: currentUser.data.id_user,
        transaction_type: selectedTransactionType,
        quantity: quantity,
        total_price: priceTotal,
      }),
    });

    const transact = await transaction.json();

    console.log(transact.data);
    setTransactionData(transact.data);
    console.log(transactionData);
    setTransactionFinished(true);

    navigate(`/transaction-detail/${transact.data.id}`, {
      state: {transactionData: transact, productData: productData},
      replace: true
    })
  }

  useEffect(() => {
    console.log(currentUser);

    getData().finally(() => {
      setLoading(false);
    });

    async function getTransactionType() {
      const response = await fetch(
        "http://localhost:8000/api/transaction-type",
        {
          method: "GET",
        }
      )

      let data = await response.json();

      console.log(data.data);

      setTransactionType(data.data);
    }

    getTransactionType().then(() => {
      //   console.log(transactionType.data)
    });

    // console.log("transact data: " + JSON.stringify(transactionData));
  }, []);

  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between p-3">
        <a className="navbar-brand" style={{ fontWeight: "bold" }}>
          RETAIL KEREN
        </a>
      </nav>
      {loading ? (
        "Loading..."
      ) : (
        <Container fluid>
          <Form>
            <Image src={productData.data.image_url} height={200} />
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Nama Produk</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={productData.data.name_product}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Deskripsi Produk</Form.Label>
              <Form.Control
                disabled
                type="text"
                value={productData.data.description_product}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setPriceTotal(
                    productData.data.price_product * e.target.value
                  );
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Tipe Transaksi</Form.Label>
              <Dropdown
                onSelect={(v) => {
                  console.log(v);
                  setSelectedTransactionType(v);
                }}
              >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  {selectedTransactionType}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  {transactionType.map((v, i) => {
                    return (
                      <Dropdown.Item eventKey={v.name_type} key={i}>
                        {v.name_type}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </Form.Group>

            <Form.Group>
              <Form.Label>Total Harga: Rp.{priceTotal}</Form.Label>
            </Form.Group>
            <Button onClick={doTransaction} variant="primary">
              Selesaikan Transaksi
            </Button>
          </Form>
        </Container>
      )}
    </>
  );
}
