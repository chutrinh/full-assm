import React from "react";

function ÌnorBoard({ infor }) {
  return (
    <>
      <div className="d-flex gap-2">
        <div className="col-4 ">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">User</h5>
              <p className="card-text">{infor.uesNumber}</p>
              <div className="text-end">
                <i className="fa-solid fa-user"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">Earning of month</h5>
              <p className="card-text">
                {Number(Number(infor.earning).toFixed(0)).toLocaleString(
                  "vi-VN"
                )}
                <span className="ms-2">VND</span>
              </p>
              <div className="text-end">
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </div>
          </div>
        </div>
        <div className="col-4">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title">New Order</h5>
              <p className="card-text">{infor.orderNumber}</p>
              <div className="text-end">
                <i className="fa-solid fa-earth-americas"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ÌnorBoard;
