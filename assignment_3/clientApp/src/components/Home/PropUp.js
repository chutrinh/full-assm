import ReactDOM from "react-dom";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";

function PropUp({ isShowModal, setIsShowModal }) {
  // lấy id sản phẩm
  const [searchParam] = useSearchParams();
  const id = searchParam.get("id");

  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (id) {
      axios("http://localhost:5000/detai-product/" + id, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        method: "GET",
      })
        .then((response) => {
          if (response.data.status === 200) {
            setProduct(response.data.data);
          } else {
            throw new Error(response.data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  }, [id]);

  // thêm sản phẩm vào giỏ hàn
  const handleModal = (e) => {
    setIsShowModal(!isShowModal);
  };

  // add to cart
  const handleAdToCart = () => {
    if (window.confirm("Bạn có muốn thêm sản phẩm này vào giỏ hàng ?")) {
      axios("http://localhost:5000/add-to-cart/", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
        method: "POST",
        data: {
          productId: product._id,
          amount: 1,
        },
      })
        .then((response) => {
          if (response.data.status === 200) {
            alert("đã thêm 1 sản phẩm vào gỏi hàng thành công");
            setIsShowModal(!isShowModal);
          } else {
            throw new Error(response.data.message);
          }
        })
        .catch((error) => {
          alert(error.message);
        });
    }
  };

  return ReactDOM.createPortal(
    <>
      {product && (
        <div
          className="w-100 h-100 position-fixed top-0 start-0 d-flex align-items-center justify-content-center"
          style={{ backgroundColor: "rgb(0,0,0,0.8)" }}
        >
          <div className="w-50 bg-success p-2 rounded-2">
            <div className="d-flex gap-5">
              <img
                className="w-50"
                src={"http://localhost:5000/" + product.img1}
              />
              <div className="w-50 position-relative">
                <div>
                  <h2>{product.name}</h2>
                  <p className="price">
                    {Number(product.price).toLocaleString("vi-VN")} VND
                  </p>
                  <p>
                    số lượng: {product.count === 0 ? "hết hàng" : product.count}
                  </p>
                  <p>{product.short_desc}</p>
                </div>
                <div className="position-absolute end-0 bottom-0">
                  <button
                    onClick={() => {
                      product.count === 0
                        ? alert("sản phẩm đã hết hàng")
                        : handleAdToCart();
                    }}
                    className="btn btn-primary me-3"
                  >
                    add to cart
                  </button>
                  <button onClick={handleModal} className="btn btn-secondary ">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>,
    document.querySelector("#popup")
  );
}
export default PropUp;
