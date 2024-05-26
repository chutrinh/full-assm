import React, { useEffect } from "react"; //import thư viện react
import InforHotel from "./InforHotel/InforHotel"; //import component inforhotel
import NavBar from "../home/Navbar/NavBar"; //import component NavBar
import Footer from "../home/Footer/Footer"; //import component Footer
import FormRegister from "../home/FormRegister/FormRegister"; //import component FormRegister
import { useNavigate } from "react-router-dom";
// tạo component detail
const Detail = (props) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/");
    }
  }, []);
  return (
    // thêm các component
    <div>
      <NavBar navbar={props.navbar}></NavBar>
      <InforHotel detail={props.detail}></InforHotel>
      <FormRegister></FormRegister>
      <Footer footer={props.footer}></Footer>
    </div>
  );
};

export default Detail; //xuất dữ liệu ra ngoài
