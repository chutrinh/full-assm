import React from "react"; //import thư viện react
import "./FormRegister.css"; //import file css để css cho nội dụng của component hiện tại.

// tạo component  FormRegister
const FormRegister = () => {
  return (
    <div id="form-register">
      <div className="form-register-container">
        <h2>Save time, save money!</h2>
        <p>sign up and we'll send the best deals to you</p>
        <input type="text" placeholder="Your Email"></input>
        <input type="submit" value="Subscible"></input>
      </div>
    </div>
  );
};
export default FormRegister; // xuất dữ liệu ra ngoài
