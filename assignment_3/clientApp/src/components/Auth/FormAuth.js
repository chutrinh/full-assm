import classes from "./FormAuth.module.css";
import { useRef } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

// đây là component chứa form đăng nhập và đăng ký
function FormAuth({ setIsLogin }) {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode");
  const fullname = useRef();
  const email = useRef();
  const password = useRef();
  const phone = useRef();
  const navigate = useNavigate();

  // xữ lý sự kiện khi người dùng nhấn vào submit form
  const handleAuth = (e) => {
    e.preventDefault();
    const data = getDataForm(fullname, email, password, phone, mode);

    if (data) {
      // login
      if (mode === "login") {
        axios("http://localhost:5000/auth/login", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          data: {
            email: data.email,
            password: data.password,
          },
          withCredentials: true,
        })
          .then((response) => {
            if (response.data.status === 200) {
              // Cookie.set("token", response.data.data.token);
              localStorage.setItem(
                "isLogin",
                JSON.stringify(response.data.data.fullName)
              );
              setIsLogin(true);
              alert(response.data.message);
              navigate("/");
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      }
      // sign up
      if (mode === "signUp") {
        axios
          .post("http://localhost:5000/auth/sign-up", {
            email: data.email,
            password: data.password,
            phone: data.phone,
            fullName: data.fullname,
          })
          .then((response) => {
            if (response.data.status === 200) {
              alert(response.data.message);
              navigate("?mode=login");
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    }
  };

  return (
    <>
      <div className={classes["background-image-container"]}>
        <div className={classes["card-form"]}>
          <form className={classes["form"]}>
            <h3>
              <i>{`${mode === "login" ? "login" : "signUp"}`}</i>
            </h3>
            <div className={classes["input-field"]}>
              {mode === "signUp" && (
                <input ref={fullname} type="text" placeholder="Full Name" />
              )}
              <input ref={email} type="enail" placeholder="Email" />
              <input ref={password} type="password" placeholder="Password" />
              {mode === "signUp" && (
                <input ref={phone} type="text" placeholder="Phone" />
              )}
              <button onClick={handleAuth}>{`${
                mode === "login" ? "login" : "signUp"
              }`}</button>
              <div className={classes["toggle"]}>
                <span>
                  {`${mode === "login" ? "Ceate a account" : "login"}`} ?
                </span>
                <Link to={`?mode=${mode === "login" ? "signUp" : "login"}`}>
                  click
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
export default FormAuth;

// lấy dữ liệu từ form
const getDataForm = (fullname, email, password, phone, mode) => {
  let data;
  if (mode === "login") {
    data = {
      email: email.current.value,
      password: password.current.value,
    };
    return data;
  }

  if (mode === "signUp") {
    data = {
      fullname: fullname.current.value,
      email: email.current.value,
      password: password.current.value,
      phone: phone.current.value,
    };
    return data;
  }
};
