import React, { useEffect, useState } from "react";
import InforBoard from "../components/inforBoard";
import HistoryOrder from "../components/historyOrder";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function DashBoard({ setEditProd }) {
  // check login
  const navigate = useNavigate();
  useEffect(() => {
    axios({
      url: "http://localhost:5000/auth/check",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    }).then((res) => {
      if (res.data.status !== 200) {
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    setEditProd(null);
  });
  const [order, setOrder] = useState(null);
  const [infor, setInfor] = useState(0);
  useEffect(() => {
    axios({
      url: "http://localhost:5000/admin/order",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.status === 200) {
          setOrder(response.data.data.order);
          const total =
            response.data.data.order.reduce((curr, item) => {
              return (curr += item.total);
            }, 0) / 12;
          setInfor({
            uesNumber: response.data.data.userNumber,
            earning: total,
            orderNumber: response.data.data.order.length,
          });
        } else {
          throw new Error(response.data.message);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);
  return (
    <>
      <InforBoard infor={infor} />
      <HistoryOrder order={order} />
    </>
  );
}
export default DashBoard;
