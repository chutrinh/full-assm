import React from "react";

function HistoryList({ order, setDetailOrder }) {
  const handleViews = (e) => {
    setDetailOrder(order[e.target.getAttribute("index")]);
  };

  return (
    <>
      <table className="table mt-3">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">ID ORDER</th>
            <th scope="col">ID USER</th>
            <th scope="col">NAME</th>
            <th scope="col">PHONE</th>
            <th scope="col">ADDRESS</th>
            <th scope="col">TOTAL</th>
            <th scope="col">DELIVERY</th>
            <th scope="col">STATUS</th>
            <th scope="col">DETAILE</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order
              .map((order, i) => {
                return (
                  <tr key={order._id}>
                    <th scope="row">{i}</th>
                    <td>{order._id}</td>
                    <td>{order.user._id}</td>
                    <td>{order.name}</td>
                    <td>{order.phone}</td>
                    <td>{order.address}</td>
                    <td>{Number(order.total).toLocaleString("vi-VN")} VND</td>
                    <td>{order.delivery}</td>
                    <td>{order.status}</td>
                    <td>
                      <button
                        onClick={handleViews}
                        index={i}
                        className="btn btn-primary"
                      >
                        <span index={i}>View</span>
                        <i index={i} className="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                );
              })
              .reverse()}
        </tbody>
      </table>
    </>
  );
}
export default HistoryList;
