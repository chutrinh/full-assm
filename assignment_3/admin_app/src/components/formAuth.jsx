import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./formAuth.module.css";
import ReactDom from "react-dom";
import axios from "axios";

function FormAuth() {
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const handleLogin = () => {
    console.log("ok");
    axios({
      url: "http://localhost:5000/auth/admin/login",
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        email: email.current.value,
        password: password.current.value,
      },
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        if (response.data.status === 200) {
          alert(response.data.message);
          if (response.data.data.role === "admin") {
            navigate("/dashboard");
          }
          if (response.data.data.role === "consultant") {
            navigate("/chat");
          }
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return ReactDom.createPortal(
    <div className="position-fixed top-0 w-100 h-100 bg-dark">
      <div className={classes["login"]}>
        <h1>Login</h1>
        <input ref={email} type="text" placeholder="email" />
        <input ref={password} type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>,
    document.body
  );
}
export default FormAuth;
