import Banner from "../components/Cart/BannerCart";
import ShoppingCart from "../components/Cart/ShoppingCart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// tạo page cart
function Cart() {
  const navigate = useNavigate();
  // check login
  useEffect(() => {
    axios({
      url: "http://localhost:5000/auth/check",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.status !== 200) {
        navigate("/auth?mode=login");
      }
    });
  }, []);
  return (
    <>
      <Banner />
      <ShoppingCart />
    </>
  );
}
export default Cart;
