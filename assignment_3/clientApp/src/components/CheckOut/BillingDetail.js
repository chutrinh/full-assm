import React, { Fragment, useState, useEffect, useRef } from "react";
import classes from "./BillingDetail.module.css";
import { useSelector } from "react-redux";
import axios from "axios";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";

function BillingDetail() {
  const navigation = useNavigate();
  const total = useSelector((state) => state.cartSlice.total);
  const [listProducts, setListProducts] = useState([]);
  const [inforUser, setInforUser] = useState(null);
  console.log(inforUser);

  useEffect(() => {
    axios("http://localhost:5000/cart/get-cart", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "GET",
    })
      .then((response) => {
        if (response.data.status === 200) {
          setInforUser(response.data.inforUser);
          setListProducts(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [total]);

  // order product
  const name = useRef();
  const email = useRef();
  const phone = useRef();
  const address = useRef();
  const [loading, setLoading] = useState(false);
  const handleOrder = () => {
    setLoading("loading...");
    axios("http://localhost:5000/order/add-order", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "POST",
      data: {
        name: name.current.value,
        email: email.current.value,
        phone: phone.current.value,
        address: address.current.value,
      },
    })
      .then((response) => {
        if (response.data.status === 200) {
          setLoading(false);
          alert(response.data.message);
          navigation("/");
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        setLoading(false);
        alert(error.message);
      });
  };

  return (
    <>
      <h2 className={classes["title-billing"]}>BILLING DETAILS</h2>
      <div className={classes["billing-detail"]}>
        <div className={classes["col-1"]}>
          <label>FULL NAME</label>
          <input
            ref={name}
            type="text"
            placeholder="Enter your name here"
            defaultValue={inforUser && inforUser.name}
          />
          <label>EMAIL</label>
          <input
            ref={email}
            type="email"
            placeholder="Enter your email here"
            defaultValue={inforUser && inforUser.email}
          />
          <label>PHONE NUMBER</label>
          <input
            ref={phone}
            type="number"
            placeholder="Enter your phone number here"
            defaultValue={inforUser && inforUser.phone}
          />
          <label>ADDRESS</label>
          <input
            ref={address}
            type="text"
            placeholder="Enter your address here"
            defaultValue={inforUser && inforUser.address}
          />
          <div>
            <button onClick={handleOrder}>Place order</button>
            {loading && (
              <span
                className="spinner-border ms-4 align-middle text-danger"
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </span>
            )}
          </div>
        </div>

        <div className={classes["col-2"]}>
          <h2>YOUR ORDER</h2>
          <div className={classes["name-price-container"]}>
            {listProducts.length > 0 &&
              listProducts.map((item) => {
                return (
                  <Fragment key={item.product._id}>
                    <div className={classes["name-price"]}>
                      <span>{item.product.name}</span>
                      <span>
                        {Number(item.product.price).toLocaleString("vi-VN")} VND
                        x {item.amount}
                      </span>
                    </div>
                  </Fragment>
                );
              })}
            <div className={classes["total"]}>
              <span>TOTAL</span>
              <span>
                {listProducts
                  .reduce(
                    (curr, item) => (curr += item.product.price * item.amount),
                    0
                  )
                  .toLocaleString("vi-VN")}
                VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BillingDetail;
