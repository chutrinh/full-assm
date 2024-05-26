// import file css và hooks
import classes from "./Catagories.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { catagoriesAction } from "../../store/shopSlice/catagoriesSlice";
import axios from "axios";

// tạo danh sách các sản phẩm
function Catagories() {
  const states = useSelector((state) => state.catagoriesSlice);
  const listProducts = states.listProducts;
  const filterData = states.filterData;
  const isStart = states.isStart;
  const dispatch = useDispatch();
  const [valueSelecOption, setValue] = useState();
  const findInput = useRef();

  // const getListProducts = useSelector((state) => state.appSlice.listProducts);
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
          dispatch(catagoriesAction.updateListProducts(response.data.data));
        } else {
          throw new Error("Couldn't find'");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  useEffect(() => {
    dispatch(catagoriesAction.REST_isStart());
  }, [dispatch]);
  // nhấn vào các tên sản phẩm để hiển thị ra sản phẩm tương ứng
  const handleBtn = (e) => {
    if (e.target.nodeName === "BUTTON") {
      findInput.current.value = "";
      dispatch(catagoriesAction.filterProducts(e.target.textContent));
      setValue(e.target.textContent);
      const idButton = e.target.getAttribute("id");
      dispatch(catagoriesAction.SET_NUMBER(Number(idButton)));
      e.target.style.textDecoration = "underline";
      e.target.style.color = "red";
      const childrenArray = Array.from(e.target.closest("div").children);
      childrenArray.forEach((item) => {
        if (item.textContent !== e.target.textContent) {
          item.style.textDecoration = "";
          item.style.color = "";
        }
      });
    }
  };

  const inexProduct = [
    "",
    "All",
    "iphone",
    "ipad",
    "Macbook",
    "airpod",
    "watch",
    "Mouse",
    "KeyBoard",
    "Orther",
  ];
  const numberList = useSelector((state) => state.catagoriesSlice.numberList);

  const select = useRef();
  const onchangeSelector = (e) => {
    findInput.current.value = "";
    dispatch(catagoriesAction.filterProducts(e.target.value));
    const selectedOption = e.target.options[e.target.selectedIndex];
    dispatch(catagoriesAction.SET_NUMBER(Number(selectedOption.id)));
  };

  useEffect(() => {
    if (select.current) {
      const childrenArray = Array.from(select.current.children);
      childrenArray.forEach((item) => {
        if (item.nodeName !== "P") {
          const id = Number(item.getAttribute("id"));
          if (id === numberList) {
            item.style.textDecoration = "underline";
            item.style.color = "red";
            setValue(inexProduct[id]);
          } else {
            item.style.textDecoration = "";
            item.style.color = "";
          }
        }
      });
    }
  }, [numberList]);
  // chuyển trang sản phẩm
  const handleTurnRight = () => {
    findInput.current.value = "";
    dispatch(catagoriesAction.COUNTER_UP({ inexProduct }));
  };
  const handleTurnLeft = () => {
    findInput.current.value = "";
    dispatch(catagoriesAction.COUNTER_DOWN({ inexProduct }));
  };

  // tìm kiếm sản phẩm
  const onchangeToFind = (e) => {
    dispatch(catagoriesAction.FIND_PRODUCTS(e.target.value));
  };

  return (
    <>
      <div className={classes["catagories"]}>
        {/* tên danh sách sản phẩm */}
        <div ref={select} onClick={handleBtn} className={classes["navbar-col"]}>
          <h2>Catagories</h2>
          <h3>Apple</h3>
          <button style={{ color: "red", textDecoration: "underLine" }} id={1}>
            All
          </button>
          <p>Iphone & Macbook</p>
          <button id={2}>iphone</button>
          <button id={3}>ipad</button>
          <button id={4}>Macbook</button>
          <p>Wireless</p>
          <button id={5}>airpod</button>
          <button id={6}>watch</button>
          <p>Orther</p>
          <button id={7}>Mouse</button>
          <button id={8}>KeyBoard</button>
          <button id={9}>Orther</button>
        </div>

        <div className={classes["infor"]}>
          <div className={classes["search"]}>
            <input
              ref={findInput}
              onChange={onchangeToFind}
              type="text"
              placeholder="Enter search here"
            />
            {/* tìm kiếm lựa chọn sản phẩm */}
            <select value={valueSelecOption} onChange={onchangeSelector}>
              <option id="1" value="All">
                All
              </option>
              <option id="2" value="iphone">
                iphone
              </option>
              <option id="3" value="ipad">
                ipad
              </option>
              <option id="4" value="Macbook">
                Macbook
              </option>
              <option id="5" value="airpod">
                airpod
              </option>
              <option id="6" value="watch">
                watch
              </option>
              <option id="7" value="Mouse">
                Mouse
              </option>
              <option id="8" value="KeyBoard">
                KeyBoard
              </option>
              <option id="9" value="Orther">
                Orther
              </option>
            </select>
          </div>
          {/* render sản phẩm */}
          <ul className={classes["list-products"]}>
            {!isStart &&
              (filterData.length > 0 ? (
                filterData.map((item) => {
                  if (item && item._id) {
                    return (
                      <li key={item._id} className={classes["product-item"]}>
                        <Link to={`/detail/${item._id}`}>
                          <img src={"http://localhost:5000/" + item.img1} />
                          <p>{item.name}</p>
                          <p>
                            số lượng:
                            {item.count === 0 ? "hết hàng" : item.count}
                          </p>
                          <p>{Number(item.price).toLocaleString("vi-VN")}VND</p>
                        </Link>
                      </li>
                    );
                  }
                })
              ) : (
                <h2>Not Product</h2>
              ))}
            {/* render lần đầu hiện tất cả sản phẩm ra */}
            {isStart &&
              listProducts.map((item) => {
                if (item && item._id) {
                  return (
                    <li key={item._id} className={classes["product-item"]}>
                      <Link to={`/detail/${item._id}`}>
                        <img src={"http://localhost:5000/" + item.img1} />
                        <p>{item.name}</p>
                        <p>
                          số lượng: {item.count === 0 ? "hết hàng" : item.count}
                        </p>
                        <p>{Number(item.price).toLocaleString("vi-VN")}VND</p>
                      </Link>
                    </li>
                  );
                }
              })}
          </ul>
          <hr style={{ marginTop: "10px" }} />

          <div className={classes["breakcam"]}>
            <div>
              {numberList > 1 && (
                <button onClick={handleTurnLeft}>
                  <i className="fa-solid fa-arrow-left"></i>
                </button>
              )}
              <span>{numberList}</span>
              {numberList < 9 && (
                <button onClick={handleTurnRight}>
                  <i className="fa-solid fa-arrow-right"></i>
                </button>
              )}
              <p style={{ marginTop: "5px" }}>showing 1 - 9 of result</p>
            </div>
          </div>
        </div>
        <div className={classes["selector"]}></div>
      </div>
    </>
  );
}
export default Catagories;
