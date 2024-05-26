// import file css và các hooks
import "./TrendingProducts.css";
import { useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// tạo danh sách sản phẩm lấy về từ api
function TrendingProducts({ isShowModal, setIsShowModal }) {
  const listProducts = useSelector((state) => state.appSlice.listProducts);
  const distch = useDispatch();
  const [searchParam, setSearchParam] = useSearchParams();

  const handleOpenModal = (e) => {
    setIsShowModal(!isShowModal);
    setSearchParam({ id: e.target.closest("li").getAttribute("idd") });
  };
  // update UI
  return (
    <>
      <div className="top-trending">
        <i>MAKE THE HARD WAY </i>
        <h2>TOP TRENDING PRODUCTS</h2>
      </div>
      <ul className="list-products">
        {listProducts.length > 0 &&
          listProducts.map((item, i) => {
            if (item && item._id) {
              return (
                <li
                  key={i}
                  idd={item._id}
                  className="product-item"
                  onClick={handleOpenModal}
                >
                  <img src={"http://localhost:5000/" + item.img1} />
                  <p>{item.name}</p>
                  <p>số lượng: {item.count === 0 ? "hết hàng" : item.count}</p>
                  <p>{Number(item.price).toLocaleString("vi-VN")} VND</p>
                </li>
              );
            }
          })}
      </ul>
    </>
  );
}
export default TrendingProducts;
