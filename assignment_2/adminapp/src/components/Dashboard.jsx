import React, { useEffect, useState } from "react";
import DashboardList from "./dashboardlist";

function Dashboard({ rerender }) {
  const [inforBoard, setInforBoard] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/admin/infor-board")
      .then((res) => res.json())
      .then((data) => {
        setInforBoard(data);
      });
  }, [rerender]);

  return (
    <>
      <div className="col-3 ">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">User</h5>
            <p className="card-text">
              {inforBoard ? inforBoard.amountUer : "Loading..."}
            </p>
            <div className="text-end">
              <i className="fa-solid fa-user"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">Order</h5>
            <p className="card-text">
              {inforBoard ? inforBoard.amountTransaction : "Loading..."}
            </p>
            <div className="text-end">
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">Earning</h5>
            <p className="card-text">
              {" "}
              {inforBoard ? `$ ${inforBoard.total}` : "Loading..."}
            </p>
            <div className="text-end">
              <i className="fa-solid fa-earth-americas"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="col-3">
        <div className="card w-100">
          <div className="card-body">
            <h5 className="card-title">Balance</h5>
            <p className="card-text">
              {inforBoard ? `$ ${inforBoard.balance}` : "Loading..."}
            </p>
            <div className="text-end">
              <i className="fa-solid fa-scale-balanced"></i>
            </div>
          </div>
        </div>
      </div>
      <DashboardList rerender={rerender} />
    </>
  );
}
export default Dashboard;
