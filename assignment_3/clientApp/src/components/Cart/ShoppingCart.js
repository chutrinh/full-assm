// import file css và các hooks
import classes from "./ShoppingCart.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { cartAction } from "../../store/homeSlice/cartSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

function ShoppingCart() {
  const [reRender, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [listProducts, setListProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cart/get-cart", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      })
      .then((response) => {
        if (response.data.status === 200) {
          setListProducts(response.data.data);
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [reRender]);

  const dispatch = useDispatch();

  // total giá tiền sản phẩm
  let sum = 0;
  if (listProducts.length > 0) {
    listProducts.map((item) => {
      let price = Number(item.product.price);
      sum += price * item.amount;
    });
  }
  useEffect(() => {
    dispatch(cartAction.UPDATE_TOTAL(sum));
  }, [sum]);

  // sự kiện tăng hoặc giảm số lượng sản phẩm
  const hanldeChangeAmount = (e) => {
    setLoading(true);
    axios("http://localhost:5000/cart/update-cart", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      withCredentials: true,
      data: {
        productId: e.target.id,
        action: e.target.getAttribute("action"),
      },
    })
      .then((response) => {
        if (response.data.status === 200) {
          setLoading(false);
          setRender(!reRender);
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
        setLoading(false);
      });
  };

  // xóa sản phẩm
  const handleDelet = (e) => {
    setLoadingDelete(true);
    if (window.confirm("bạn có muốn xóa sản phẩm này?")) {
      const id = e.target.id;
      axios("http://localhost:5000/cart/delete-product", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        withCredentials: true,
        data: { productId: id },
      })
        .then((response) => {
          if (response.data.status === 200) {
            alert(response.data.message);
            setLoadingDelete(false);
            setRender(!reRender);
          } else {
            throw new Error(response.data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
          setLoadingDelete(false);
        });
    } else {
      setLoadingDelete(false);
    }
  };

  return (
    <>
      <h2 className={classes["shopping-title"]}>Shopping Cart</h2>
      <div className={classes["shopping-cart"]}>
        <div className={classes["col-1"]}>
          <table border={1} className={classes["table"]}>
            <thead className={classes["thead"]}>
              <tr>
                <th className={classes["img"]}>IMAGR</th>
                <th>PRODUCT</th>
                <th>PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL</th>
                <th>REMOVE</th>
              </tr>
            </thead>
            {/* render sản phẩm */}
            <tbody className={classes["tbody"]}>
              {listProducts.length > 0 &&
                listProducts.map((item) => {
                  if (item && item.product._id) {
                    return (
                      <tr key={item.product._id}>
                        <td>
                          <img
                            src={"http://localhost:5000/" + item.product.img1}
                          />
                        </td>
                        <td>
                          <h3>{item.product.name}</h3>
                        </td>
                        <td>
                          {Number(item.product.price).toLocaleString("vi-VN")}
                          VND
                        </td>
                        <td className={classes["quantity"]}>
                          {loading && (
                            <span
                              className="spinner-border ms-4 align-middle text-danger"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </span>
                          )}
                          {item.amount > 0 && (
                            <i
                              id={item.product._id}
                              action="DECREMENT"
                              onClick={hanldeChangeAmount}
                              className="fa-solid fa-caret-left"
                            ></i>
                          )}
                          <span>{item.amount}</span>
                          <i
                            id={item.product._id}
                            action="INCREMENT"
                            onClick={hanldeChangeAmount}
                            className="fa-solid fa-caret-right"
                          ></i>
                        </td>
                        <td>
                          {(
                            Number(item.product.price) * Number(item.amount)
                          ).toLocaleString("vi-VN")}
                          VND
                        </td>
                        <td>
                          <i
                            id={item.product._id}
                            onClick={handleDelet}
                            className={`fa-solid fa-trash ${classes["delete"]}`}
                          ></i>
                          {loadingDelete && (
                            <span
                              className="spinner-border ms-4 align-middle text-danger"
                              role="status"
                            >
                              <span className="visually-hidden">
                                Loading...
                              </span>
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
            </tbody>
          </table>
          {/* change direct */}
          <div className={classes["derict-shopping"]}>
            <Link to="/shop">
              <i className="fa-solid fa-arrow-left"></i>
              <span className={classes["continue"]}>continue shopping</span>
            </Link>
            <Link to="/cart/checkout">
              <span className={classes["process"]}>process to checkout</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* cart toltal */}
        <div className={classes["cart-tatol"]}>
          <h2>CART TATOL</h2>
          <div className={classes["subtatol"]}>
            <span>SUBTATOL</span>{" "}
            <span style={{ fontSize: "0.8em" }}>
              {sum.toLocaleString("vi-VN")} VND
            </span>
          </div>
          <div className={classes["total"]}>
            <span>TATOL</span> <span>{sum.toLocaleString("vi-VN")} VND</span>
          </div>
          <input type="text " placeholder="Enter your counpon" />
          <div className={classes["apply-coupon"]}>
            <i className="fa-solid fa-gift"></i>
            <button>Apply counpon</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default ShoppingCart;
