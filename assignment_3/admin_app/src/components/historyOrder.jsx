import React from "react";

function HistoryOrder({ order }) {
  return (
    <>
      <h3 className="mt-5">History</h3>
      <table className="table text-start ">
        <thead>
          <tr>
            <th>ID User</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Total</th>
            <th>Delivery</th>
            <th>Status</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          {order &&
            order.map((item) => {
              return (
                <tr key={item._id}>
                  <th>{item.user._id}</th>
                  <th>{item.name}</th>
                  <td>{item.phone}</td>
                  <td>{item.address}</td>
                  <td>{Number(item.total).toLocaleString("vi-VN")} VND</td>
                  <td>{item.delivery}</td>
                  <td>{item.status}</td>
                  <td>
                    <p className="btn btn-success">View</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default HistoryOrder;
