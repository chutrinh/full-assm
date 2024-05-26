import React, { useEffect } from "react";
import NavBar from "./Navbar/NavBar";
import Header from "./Header/Header";
import Content from "./Content/Content";
import FormRegister from "./FormRegister/FormRegister";
import Footer from "./Footer/Footer";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  // kiểm tra người dùng đã đăng nhập hay chưa
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/");
    }
  }, []);
  return (
    <div>
      <NavBar navbar={props.navbar}></NavBar>
      <Header></Header>
      <Content city={props.city} hotelList={props.hotelList}></Content>
      <FormRegister></FormRegister>
      <Footer footer={props.footer}></Footer>
    </div>
  );
};

export default Home;
