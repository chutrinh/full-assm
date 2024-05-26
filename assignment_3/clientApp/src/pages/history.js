import React, { useState, useEffect, useMemo } from "react";
import Banner from "../components/history/banner";
import HistoryList from "../components/history/history";
import HistoryInforDetail from "../components/history/history-infor-detail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function History() {
  const [order, setOrder] = useState(null);
  const [detailOrder, setDetailOrder] = useState(null);

  const navigate = useNavigate();
  // check login
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
        navigate("/auth?mode=login");
      }
    });
  }, []);

  useEffect(() => {
    axios("http://localhost:5000/history/get-order", {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
      method: "GET",
    })
      .then((response) => {
        if (response.data.status === 200) {
          setOrder(response.data.data);
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
      <Banner />
      <HistoryList order={order} setDetailOrder={setDetailOrder} />
      <HistoryInforDetail detailOrder={detailOrder} />
    </>
  );
}
export default History;
