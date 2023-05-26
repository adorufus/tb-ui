import logo from "./logo.svg";
import "./App.css";
import React, { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "./views/login";
import Home from "./views/home";
import OrderDetail from "./views/order-detail";
import {Component} from "react"
import {getCurrentUser} from "./utils/utils"
import TransactionSuccess from "./views/transaction-success";

function App() {
  const currentUser = getCurrentUser()

  const setComponent = (component: Component) => {
    console.log(currentUser)
    if(currentUser) {
        return component
    } else {
        return (
            <Navigate to={{
                pathname: "/login",
            }}/>
        )
    }
}

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={setComponent(<Home/>)} />
        <Route path="/transaction-detail/:transactionId" element={setComponent(<TransactionSuccess/>)} />
        <Route path="/order-detail/:productId" element={setComponent(<OrderDetail/>)} />
        <Route path="/login" element={<Login></Login>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
