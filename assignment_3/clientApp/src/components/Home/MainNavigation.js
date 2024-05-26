// import file css và các hooks
import "./MainNavigation.css";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookie from "js-cookie";
import axios from "axios";
import { useEffect } from "react";

function Mainnavigation({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  // kiểm tra đăng nhập
  useEffect(() => {
    axios("http://localhost:5000/auth/check", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status === 200) {
          setIsLogin(true);
          return navigate("/");
        }
        throw new Error(response.data.message);
      })
      .catch((error) => {
        setIsLogin(false);
        // alert(error.message);
      });
  }, []);

  const handleLogOut = () => {
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
          setIsLogin(false);
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
      <div className="navbar">
        <div className="col-nav-1">
          {/* home page */}
          <NavLink
            to="/"
            className={({ isActive }) => {
              return isActive ? "active" : "unActive";
            }}
          >
            Home
          </NavLink>
          {/* shope page */}
          <NavLink
            to="/shop"
            className={({ isActive }) => {
              return isActive ? "active" : "unActive";
            }}
          >
            Shop
          </NavLink>
        </div>
        {/* logo */}
        <div className="col-nav-2">
          <h1>BOUTIQUE</h1>
        </div>
        {/* cart */}
        <div className="col-nav-3">
          {isLogin && (
            <NavLink
              to="/cart"
              className={({ isActive }) => {
                return isActive ? "active" : "unActive";
              }}
            >
              <i className="fa-solid fa-cart-shopping"></i>
              <span>Cart</span>
            </NavLink>
          )}
          {isLogin && (
            <NavLink
              to="/history"
              className={({ isActive }) => {
                return isActive ? "active" : "unActive";
              }}
            >
              <i className="fa-solid fa-clock-rotate-left"></i>
              <span>history</span>
            </NavLink>
          )}
          {/* login */}
          {!isLogin && (
            <NavLink
              to="/auth?mode=login"
              className={({ isActive }) => {
                return isActive ? "active" : "unActive";
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span>Login</span>
            </NavLink>
          )}
          {/* tên người dùng */}
          {isLogin && (
            <a>
              <i className="fa-solid fa-user"></i>
              <span style={{ marginRight: "5px" }}>
                {JSON.parse(localStorage.getItem("isLogin"))}
              </span>
              <i className="fa-solid fa-caret-down"></i>
            </a>
          )}
          {/* logout */}
          {isLogin && (
            <button className="logout" onClick={handleLogOut}>
              <span>(Logout)</span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
export default Mainnavigation;
