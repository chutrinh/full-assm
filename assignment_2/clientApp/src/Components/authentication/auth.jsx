import React, { useState, useEffect } from "react";
import Nav from "./nav";
import Form from "./form";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      localStorage.setItem("token", null);
    } else {
      const token = localStorage.getItem("token");
      fetch(`http://localhost:5000/auth?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.token === JSON.parse(localStorage.getItem("token"))) {
            navigate("/home");
          }
        });
    }
  }, []);
  return (
    <>
      <Nav setLogin={setLogin} />
      <Form login={login} setLogin={setLogin} />
    </>
  );
}
export default Auth;
