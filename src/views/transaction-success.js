import {
  Form,
  Button,
  Container,
  ListGroup,
  Dropdown,
  Image,
} from "react-bootstrap";

import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function TransactionSuccess(props) {

    const navigate = useNavigate()

    const {state} = useLocation()
    console.log("state: " + JSON.stringify(state))

    const {transactionData, productData} = state

    const {transactionId} = useParams()
    console.log(transactionId)

  return (
    <Container fluid>
        Transaksi Selesai
        <ListGroup>
          <ListGroup.Item>
            Nama Produk: {productData.data.name_product}
          </ListGroup.Item>
          <ListGroup.Item>
            Quantity: {transactionData.data.quantity}
          </ListGroup.Item>
          <ListGroup.Item>
            Total Harga: {transactionData.data.total_price}
          </ListGroup.Item>
          <ListGroup.Item>
            Tipe Transaksi: {transactionData.data.transaction_type}
          </ListGroup.Item>
          <ListGroup.Item>
            Status: {transactionData.data.status === "waiting_payment" ? "Menunggu Pembayaran" : transactionData.data.status}
          </ListGroup.Item>
        </ListGroup>
        <Button className="mt-5" onClick={() => {
            navigate('/', {
                replace: true
            })
        }}>Kembali Belanja</Button>
      </Container>
  );
}
