import BannerCheckOut from "../components/CheckOut/BannerCheckOut";
import BillingDetail from "../components/CheckOut/BillingDetail";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
// tạp page checkout
function CheckOut() {
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
      <BannerCheckOut />
      <BillingDetail />
    </>
  );
}
export default CheckOut;
