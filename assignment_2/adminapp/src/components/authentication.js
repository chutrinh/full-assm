import React, { useRef, useEffect } from "react";
import classes from "./authentication.module.css";
import { useNavigate } from "react-router-dom";
function Form() {
  const navigate = useNavigate();
  useEffect(() => {
    if (JSON.parse(localStorage.getItem("admin"))) {
      navigate("/home");
    }
  }, []);

  const email = useRef();
  const password = useRef();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email.current.value) {
      return alert("vui lòng nhập thông tin email");
    }
    if (!password.current.value) {
      return alert("vui lòng nhập thông tin password");
    }
    fetch("http://localhost:5000/auth/admin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if ("email" in data) {
          localStorage.setItem("admin", JSON.stringify(data));
          navigate("/home");
        }
        if ("message" in data) {
          alert(data.message);
        }
      });
  };

  return (
    <>
      <form className={classes["login"]}>
        <h1>Login</h1>
        <input ref={email} type="email" placeholder="email" />
        <input ref={password} type="password" placeholder="Password" />
        <button onClick={handleLogin}>Login</button>
      </form>
    </>
  );
}
export default Form;
