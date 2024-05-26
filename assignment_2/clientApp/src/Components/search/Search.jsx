import React, { useEffect } from "react"; // import thư viện react
import ContentSearch from "./ContentSearch/ContentSearch"; // import component contentSearch
import NavBar from "../home/Navbar/NavBar"; // import component NavBar
import Header from "../home/Header/Header"; // import component Header
import Footer from "../home/Footer/Footer"; // import component Footer
import FormRegister from "../home/FormRegister/FormRegister"; // import component FormRegister
import { useNavigate } from "react-router-dom";
// tạo component search
const Search = (props) => {
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
      <ContentSearch search={props.search}></ContentSearch>
      <FormRegister></FormRegister>
      <Footer footer={props.footer}></Footer>
    </div>
  );
};

export default Search; // xuất dữ liệu ra ngoài
