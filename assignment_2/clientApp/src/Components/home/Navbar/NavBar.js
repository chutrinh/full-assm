import React, { useState, useContext } from "react"; // import thư viện react
import "./NavBar.css"; // import file navbar css vào để css cho component hiện tại
import { StroreContext } from "../../store/store";

import { useNavigate } from "react-router-dom";

// tạo component navbar
const NavBar = (props) => {
  const { rerenderStore, setRenderStore } = useContext(StroreContext);
  const navigate = useNavigate();

  // tạo css để hiển thị boder cho từng memu trên thanh navbar khi được active
  const activeBorder = {
    border: "1px solid white",
    borderRadius: "20px",
  };
  // sử dụng userstate để lưu trữ trạng thái active
  const [active, setActive] = useState(props.navbar);
  const openBoder = (e) => {
    if (
      e.target.nodeName === "A" ||
      e.target.nodeName === "LI" ||
      e.target.nodeName === "I"
    ) {
      // set active bằng true hoặc false dựa vào dữ liệu trả về từ mãng props.navbar
      setActive(
        active.map((el, i) => {
          if (i === Number(e.target.closest("li").getAttribute("index"))) {
            el.active = true;
            return el;
          } else {
            el.active = false;
            return el;
          }
        })
      );
    }
  };

  // transaction
  const handleTransaction = () => {
    navigate("/transaction");
  };
  return (
    <div className="nav-bar">
      <div className="nav-container">
        <div className="nav-user">
          <h2
            onClick={() => {
              setRenderStore(!rerenderStore);
              navigate("/home");
            }}
          >
            Booking Website
          </h2>
          <div>
            <span className="btn-nav">
              {JSON.parse(localStorage.getItem("userName"))}
            </span>
            <button onClick={handleTransaction} className="btn-nav">
              Transaction
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userName");
                navigate("/");
              }}
              className="btn-nav"
            >
              Logout
            </button>
          </div>
        </div>
        {/* ------------------------------ */}

        <ul className="nav-list " onClick={openBoder}>
          {/* sử dụng hàm map để render dữ liệu ra ngoài */}
          {active.map((el, i) => {
            return (
              <li
                style={el.active === true ? activeBorder : {}}
                key={i}
                index={i}
              >
                <a href="#">
                  <i className={el.icon}></i> {el.type}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
export default NavBar; // xuất dữ liệu ra ngoài
