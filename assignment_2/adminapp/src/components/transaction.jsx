import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function Transaction() {
  const [dashboardList, setDashboardList] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/admin/transaction-all")
      .then((res) => res.json())
      .then((data) => {
        setDashboardList(data);
      });
  }, []);
  return (
    <>
      <h3 className="mt-5">Transactions List</h3>
      <table className="table text-start ">
        <thead>
          <tr>
            <th>#</th>
            <th>User</th>
            <th>Hotel</th>
            <th>Room</th>
            <th>Date</th>
            <th>Price</th>
            <th>Payment Method</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dashboardList &&
            dashboardList.map((trans) => {
              return (
                <tr key={trans._id}>
                  <th>
                    <input type="checkbox" />
                    <span className="mx-3">{trans._id}</span>
                  </th>
                  <td>
                    {trans.user ? trans.user.email : "người dùng này đã bị xóa"}
                  </td>
                  <td>
                    {trans.hotel ? trans.hotel.title : "hotel này đã bị xóa"}
                  </td>
                  <td>
                    {trans.room
                      .map((rm) => rm.roomNumbers.map((item) => item))
                      .join()}
                  </td>
                  <td>
                    {`${new Date(trans.dateStart).getFullYear()} - ${
                      new Date(trans.dateStart).getMonth() + 1
                    } -
                    ${new Date(trans.dateStart).getDate()} `}
                    to{" "}
                    {` ${new Date(trans.dateEnd).getFullYear()} - ${
                      new Date(trans.dateEnd).getMonth() + 1
                    } -
                    ${new Date(trans.dateEnd).getDate()} `}
                  </td>
                  <td>${trans.price}</td>
                  <td>{trans.payment}</td>
                  <td>
                    <p className="btn btn-success">{trans.status}</p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default Transaction;
