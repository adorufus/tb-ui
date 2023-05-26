import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
      async function getData() {
          setLoading(true)
        const response  = await fetch("http://localhost:8000/api/produk", {
            method: "GET"
        })
        let actualData = await response.json()

        console.log(actualData)

        setProductData(actualData)
      }

      getData().finally(() => {
          setLoading(false)
      })
  }, [])

  async function searchProduct() {
      const response = await fetch(`http://localhost:8000/api/produk/${searchQuery}`, {
          method: "GET"
      })

      setProductData(await response.json())
  }

  return (
    <>
      <nav className="navbar navbar-light bg-light justify-content-between p-3">
        <a className="navbar-brand" style={{ fontWeight: "bold" }}>
          RETAIL KEREN
        </a>
        <div className="form-inline">
          <div className="input-group">
            {/* <button class="btn btn-info" style={{ color: "white" }}>
              Keranjang
            </button> */}
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              value={searchQuery}
              onChange={(v) => {
                  setSearchQuery(v.target.value)
                  console.log(searchQuery)
              }}
            />
            <button onClick={() => {
                console.log(searchQuery)
                
                searchProduct()
            }} className="btn btn-outline-success my-2 my-sm-0" >
              Cari
            </button>
          </div>
        </div>
      </nav>
      { loading ? "Loading" : <div className="container-fluid">
        <h1 className="pt-4">Semua Produk</h1>
        <div className="row">
          {productData.data && productData.data.map((v, i) => (
              <div className="col-md-2 mt-2" key={i}>
              <div className="card">
                <div className="card-body">
                  <div className="d-flex flex-column">
                    <img src={v.image_url} alt="product image" />
                    <div>{v.description_product}</div>
                  </div>
                  <div className="card-footer">
                    <div className="d-flex justify-content-between align-items-center">
                      <div style={{ color: "forestgreen" }}>Rp.{v.price_product}</div>
                      <button className="btn btn-danger" onClick={() => navigate("/order-detail/" + v.id)}>Beli</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>}
    </>
  );
}
