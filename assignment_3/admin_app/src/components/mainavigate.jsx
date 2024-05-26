import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

function Mainavigate({ children }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios({
      url: "http://localhost:5000/auth/logout",
      headers: {
        "Content-Type": "appliction/json",
      },
      method: "POST",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.status === 200) {
          navigate("/");
        } else {
          throw new Error(res.data.message);
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <div className="container-fluid mt-3 text-start">
        <div className="row">
          <div className="col-2 border-end">
            <h4 className="text-center">Admin page</h4>
          </div>
          <div className="col-10 border-bottom"></div>
        </div>
        <div className="row ">
          <div className="col-2 p-0">
            <div className="list-group ">
              <div className="list-group-item">
                <p> Main</p>
                <i className="fa-solid fa-house mx-2"></i>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <br />
                <i className="fa-solid fa-tent-arrow-left-right mx-2"></i>
                <NavLink to="/product">Product</NavLink>
              </div>

              <div className="list-group-item">
                <p>List</p>
                <div className="mx-2">
                  <i className="fa-solid fa-user me-2"></i>
                  <a className="user">User</a> <br />
                  <br />
                  <i className="fa-solid fa-person-booth me-1"></i>
                  <NavLink to="/chat">Chat</NavLink>
                </div>
              </div>

              <div className="list-group-item">
                <p>New</p>
                <div className="mx-2">
                  <i className="fa-solid fa-file me-2"></i>
                  <NavLink to="/add-new-product">add new product</NavLink>
                  <br />
                </div>
              </div>

              <div className="list-group-item">
                <p>Tài Khoản</p>
                <div className="mx-2">
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  <a onClick={handleLogout} className="logout">
                    log out
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-10" style={{ padding: "40px" }}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
export default Mainavigate;
