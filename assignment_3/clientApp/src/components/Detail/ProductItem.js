// import file css và các hooks vào file
import classes from "./ProductItem.module.css";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { detaiAction } from "../../store/detailSlice/detailSlice";
import axios from "axios";

// tạo component để xem chi tiết sản phẩm
function ProductItem() {
  const params = useParams();
  const dispatch = useDispatch();

  const filterData = useSelector((state) => state.detailSlice.filterData);
  const filterRelated = useSelector((state) => state.detailSlice.filterRelated);

  useEffect(() => {
    axios("http://localhost:5000", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "GET",
    })
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(detaiAction.updateListProducts(response.data.data));
          return new Promise((resolve, reject) => {
            axios("http://localhost:5000/detai-product/" + params.prductId, {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
              method: "GET",
            })
              .then((response) => {
                if (response.data.status === 200) {
                  dispatch(detaiAction.filterProducts(response.data.data));
                } else {
                  throw new Error("Couldn't find product");
                }
              })
              .catch((error) => {
                reject(error.message);
              });
          });
        } else {
          throw new Error("Couldn't find product");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [params.prductId]);

  // sự kiện add to cart
  const amount = useSelector((state) => state.detailSlice.amount);
  const handleAddToCart = () => {
    if (amount > 0) {
      if (window.confirm("bạn có muốn thêm sản phẩm này vào giỏ hàng ?")) {
        axios("http://localhost:5000/add-to-cart", {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
          method: "POST",
          data: { productId: filterData._id, amount: amount },
        })
          .then((response) => {
            if (response.data.status === 200) {
              alert(response.data.message);
            } else {
              throw new Error(response.data.message);
            }
          })
          .catch((error) => {
            alert(error.message);
          });
      }
    } else {
      alert("vui lòng nhập số lượng sản phẩm");
    }
    dispatch(detaiAction.RESET());
  };

  // tăng số lượng
  const handleIncrement = () => {
    if (amount !== filterData.count) {
      dispatch(detaiAction.COUTER_UP());
    } else {
      alert("sản phẩm đã hết");
    }
  };
  const handleDrement = () => {
    dispatch(detaiAction.COUTER_DOWN());
  };

  // reset amount detail
  useEffect(() => {
    dispatch(detaiAction.RESET());
  }, [dispatch]);

  // thay đổi ảnh chính
  const imgMain = useRef();
  const imgs = useRef();
  useEffect(() => {
    if (imgs.current) {
      const childrenArray = Array.from(imgs.current.children);
      childrenArray.forEach((item) => {
        item.addEventListener("mouseenter", () => {
          imgMain.current.src = item.src;
          item.style.cursor = "pointer";
        });
        item.addEventListener("mouseleave", () => {
          imgMain.current.src = "http://localhost:5000/" + filterData.img1;
        });
      });
    }
  }, [filterData]);
  // console.log("http://localhost:5000/" + filterData.img1);
  return (
    <>
      {/* chi tiết sản phẩm prduct */}
      {filterData && (
        <div>
          <div className={classes["prduct"]}>
            <div className={classes["img"]}>
              <div ref={imgs} className={classes["img-extra"]}>
                <img id={1} src={"http://localhost:5000/" + filterData.img2} />
                <img id={2} src={"http://localhost:5000/" + filterData.img3} />
                <img id={3} src={"http://localhost:5000/" + filterData.img4} />
              </div>
              <img
                ref={imgMain}
                src={"http://localhost:5000/" + filterData.img1}
              />
            </div>
            <div className={classes["infor-product"]}>
              <h2>{filterData.name}</h2>
              <p>
                số lượng:
                {filterData.count === 0 ? "hết hàng" : filterData.count}
              </p>
              <p>{Number(filterData.price).toLocaleString("vi-VN")} VND</p>
              <p>{filterData.short_desc}</p>
              <div>
                <span>CATOGARISE:</span> <span>{filterData.category}</span>
              </div>

              {/* namber */}
              <div className={classes["width-number"]}>
                <div className={classes["number-product"]}>
                  <span>quantity:</span>
                  {amount > 0 && (
                    <i
                      onClick={handleDrement}
                      className="fa-solid fa-caret-left"
                    ></i>
                  )}
                  <span>{amount}</span>
                  <i
                    onClick={handleIncrement}
                    className="fa-solid fa-caret-right"
                  ></i>
                  <button onClick={handleAddToCart}>add to cart</button>
                </div>
              </div>
            </div>
          </div>

          {/* decription */}

          <div className={classes["decription"]}>
            <div>
              <button>DECRIPTION</button>
            </div>
            <h3>PRODUCT DECRIPTION</h3>
            <div>
              <h4>Đặc điểm nổi bật</h4>
              {filterData.long_desc.split("•").map((des, i) => {
                return (
                  <p key={i} className="mb-1">
                    {des}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      )}
      {/* related product */}

      <h2 className={classes["title-related"]}>RELATED PROPDUCTS</h2>
      <ul className={classes["related-product"]}>
        {filterRelated.length > 0 ? (
          filterRelated.map((item) => {
            return (
              <li key={item._id} className={classes["product-item"]}>
                <img src={"http://localhost:5000/" + item.img1} />
                <p>{item.name}</p>
                <p>số lượng: {item.count === 0 ? "hết hàng" : item.count}</p>
                <p>{Number(item.price).toLocaleString("vi-VN")} VND</p>
              </li>
            );
          })
        ) : (
          <p>Not Related product</p>
        )}
      </ul>
    </>
  );
}
export default ProductItem;
