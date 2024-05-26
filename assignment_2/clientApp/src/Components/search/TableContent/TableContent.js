import React, { useContext } from "react"; // import thư viện react
import "./TableContent.css"; // import file tableContent vào để css cho component hiện tại
import { StroreContext } from "../../store/store";
// tạo component tablecontent để chứa các nội dung tìm kiếm
const TableContent = () => {
  const { dataSearch } = useContext(StroreContext);
  return (
    <div style={{ width: "80%" }}>
      {dataSearch ? (
        dataSearch.map((el, i) => {
          return (
            <div id="table-search" key={i}>
              <img src={el.photos[0]}></img>
              <div className="card-detail">
                <h3>{el.name}</h3>
                <span>{el.name}</span>
                <div className="type-free">
                  <p>{el.city}</p>
                  <p>{el.type}</p>
                  <p>Free cancellation</p>
                </div>
                <p
                  style={{
                    marginBottom: "5px",
                    fontWeight: "bold",
                    marginTop: "10px",
                  }}
                >
                  You can cancel later, so lock in this great price today!
                </p>
                <p>{el.desc}</p>
              </div>
              <div className="card-price">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "10px",
                  }}
                >
                  <span>rate</span>
                  <span
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      borderRadius: "5px",
                      padding: "0 10px",
                    }}
                  >
                    {el.rating}
                  </span>
                </div>
                <div className="price">
                  <p>${el.cheapestPrice}</p>
                  <p>incluea taxes and fees</p>
                  <button>see availability</button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3>không tìm thấy</h3>
      )}
    </div>
  );
};
export default TableContent; // xuất dữ liệu ra ngoài
