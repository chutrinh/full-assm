import React, { useEffect, useState } from "react";
import classes from "./login.module.css";
import { useNavigate } from "react-router-dom";

function Form({ login, setLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handlesubmit = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("token"));
    if (!formData.email) {
      return alert("vui lòng nhập thông tin email");
    }
    if (!formData.password) {
      return alert("vui lòng nhập thông tin password");
    }

    fetch(`http://localhost:5000/auth/${login ? "login" : "register"}`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ formData, token }),
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (login) {
          if (data) {
            localStorage.setItem("token", JSON.stringify(data.token));
            localStorage.setItem("userName", JSON.stringify(data.email));
            navigate("/home");
          } else {
            alert("tài khoản không chính sát");
          }
        } else {
          if (data.message) {
            setLogin(!login);
            alert("đăng ký thành công!");
            navigate("/");
          } else {
            alert("email đã có trên hệ thống");
          }
        }
      });
  };

  return (
    <>
      <form onSubmit={handlesubmit} className={classes["login"]}>
        <h1>{login ? "Login" : "Sign up"}</h1>
        <input
          type="email"
          placeholder="Emal"
          value={formData.email}
          onChange={(e) =>
            setFormData({ email: e.target.value, password: formData.password })
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ email: formData.email, password: e.target.value })
          }
        />
        <button type="submit">{login ? "Login" : "Register"}</button>
      </form>
    </>
  );
}
export default Form;
