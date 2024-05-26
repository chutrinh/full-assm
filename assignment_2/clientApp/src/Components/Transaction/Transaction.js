import React, { useEffect, useState } from "react";
import NavBar from "../home/Navbar/NavBar";
import { useNavigate } from "react-router-dom";
function Transaction(props) {
  const [transaction, setTransaction] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("token"))) {
      navigate("/");
    }
  }, []);
  useEffect(() => {
    fetch("http://localhost:5000/user/transaction", {
      method: "POST",
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("token")),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length > 0) {
          setTransaction(data);
        } else {
          setTransaction(null);
        }
      });
  }, []);

  return (
    <>
      <NavBar navbar={props.navbar} />
      <div className="mx-auto" style={{ width: "960px" }}>
        <table className="table text-center">
          <thead>
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room</th>
              <th>Date</th>
              <th>Price</th>
              <th>Payment Method</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {transaction &&
              transaction.map((tr, i) => {
                return (
                  <tr key={i}>
                    <th>{i + 1}</th>
                    <td>{tr.hotel ? tr.hotel.title : "hotel này đã bị xóa"}</td>
                    <td>
                      {tr.room
                        .map((rm) => rm.roomNumbers.map((item) => item))
                        .join()}
                    </td>
                    <td>
                      {`${new Date(tr.dateStart).getFullYear()}-${
                        new Date(tr.dateStart).getMonth() + 1
                      }-
                    ${new Date(tr.dateStart).getDate()} `}
                      to{" "}
                      {` ${new Date(tr.dateEnd).getFullYear()}-${
                        new Date(tr.dateEnd).getMonth() + 1
                      }-
                    ${new Date(tr.dateEnd).getDate()} `}
                    </td>
                    <td>${tr.price}</td>
                    <td>{tr.payment}</td>
                    <td>{tr.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </>
  );
}
export default Transaction;
