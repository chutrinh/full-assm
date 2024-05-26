// import các component
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Rootlayout from "./pages/root";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Detail from "./pages/detail";
import Auth from "./pages/auth";
import Cart from "./pages/cart";
import CheckOut from "./pages/checkout";
import History from "./pages/history";

import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { appAction } from "./store/homeSlice/appSlice";
import axios from "axios";

function App() {
  const distch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  // lấy dữ liệu từ api
  useEffect(() => {
    axios("http://localhost:5000", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((response) => {
        if (response.data.status === 200) {
          distch(appAction.getProducts(response.data.data));
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  //
  // sử dụng router để chuyển hướng các page với nhau
  return (
    <BrowserRouter>
      <Rootlayout isLogin={isLogin} setIsLogin={setIsLogin}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/detail/:prductId" element={<Detail />} />
          <Route path="/auth" element={<Auth setIsLogin={setIsLogin} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/history" element={<History />} />
          <Route path="/cart/checkout" element={<CheckOut />} />
        </Routes>
      </Rootlayout>
    </BrowserRouter>
  );
}

export default App;
