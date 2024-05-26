import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import Calendar from "../../home/Header/Date";
import { useNavigate } from "react-router-dom";
import useDataRange from "../../hooks/useDate";

function ReserverBook({ hotel, id }) {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [totalPriceAllRoom, setTotalPriceAllRoom] = useState(0);
  const [rooms, setRooms] = useState(null);
  const [payment, setPayment] = useState(null);
  const [transaction, setTransaction] = useState(null);

  const handeCheck = (e) => {
    const checkboxs = document.querySelectorAll(".checkbox");
    const rooms = [];
    checkboxs.forEach((checkbox) => {
      const index = rooms.findIndex(
        (item) => item.id === checkbox.getAttribute("_id")
      );
      if (index >= 0) {
        if (checkbox.checked) {
          rooms[index].roomNumbers.push(checkbox.getAttribute("number-room"));
          rooms[index].totalPrice += Number(checkbox.getAttribute("price"));
        }
      } else {
        if (checkbox.checked) {
          rooms.push({
            id: checkbox.getAttribute("_id"),
            totalPrice: checkbox.checked
              ? Number(checkbox.getAttribute("price"))
              : 0,
            roomNumbers: [
              checkbox.checked && checkbox.getAttribute("number-room"),
            ],
            startDate: checkbox.getAttribute("start-date"),
            endDate: checkbox.getAttribute("end-date"),
          });
        }
      }
    });
    const total = rooms.reduce((curr, item) => (curr += item.totalPrice), 0);
    setTotalPriceAllRoom(total);
    setRooms(rooms);
  };

  // fetch api
  const handleReserve = () => {
    if (!startDate) {
      alert("vui lòng chọn ngày");
      return;
    }
    if (!rooms > 0) {
      alert("vui lòng chọn phòng");
      return;
    }
    if (!payment > 0) {
      alert("vui lòng chọn phương thức thanh toán");
      return;
    }
    fetchApi(
      rooms,
      payment,
      hotel._id,
      startDate,
      endDate,
      numberOfDays * totalPriceAllRoom,
      navigate
    );
  };
  // get transaction
  useEffect(() => {
    getTransaction(hotel._id, setTransaction);
  }, []);

  return (
    <>
      <div
        className="mx-auto mt-5 d-flex justify-content-between"
        style={{ width: "960px" }}
      >
        <div>
          <h2>Date</h2>
          <Calendar
            dataRanges={{
              useDataRange,
              setStartDate,
              setEndDate,
              setNumberOfDays,
            }}
          ></Calendar>
        </div>
        <div className="w-50">
          <h2>Reserve Info</h2>
          <div>
            <label className="form-label">Your FullName:</label>
            <input type="text" className="form-control" />
            <label className="form-label">Your Email:</label>
            <input type="email" className="form-control" />
            <label className="form-label">Your Phone Number:</label>
            <input type="text" className="form-control" />
            <label className="form-label">Your Identity Cart Number:</label>
            <input type="text" className="form-control" />
          </div>
        </div>
      </div>
      {/* -------------- */}
      <div className="mx-auto mt-5 " style={{ width: "960px" }}>
        <div>
          <h2>Select Room</h2>
          <div className="d-flex  flex-wrap">
            {hotel.rooms.map((room) => {
              return (
                <div
                  key={room._id}
                  className="d-flex w-50 justify-content-between border px-3 py-3"
                >
                  <div>
                    <h5>{room.title}</h5>
                    <p className="m-0"></p>
                    <p>Max people: {room.maxPeople}</p>
                    <h6>${room.price}</h6>
                  </div>
                  <div className="d-flex gap-3 px-5 text-center">
                    {/* ------------------------------------ */}

                    {room.roomNumbers.map((roomnumb) => {
                      let check;
                      if (transaction) {
                        transaction.forEach((roomsT) => {
                          roomsT.room.forEach((rmT) => {
                            if (rmT.id === room._id) {
                              const inclu = rmT.roomNumbers.includes(
                                String(roomnumb)
                              );
                              if (inclu) {
                                const checkkk = coNgayTrungNhau(
                                  {
                                    batDau: new Date(startDate),
                                    ketThuc: new Date(endDate),
                                  },
                                  {
                                    batDau: new Date(rmT.startDate),
                                    ketThuc: new Date(rmT.endDate),
                                  }
                                );
                                check = checkkk;
                              }
                            }
                          });
                        });
                      }
                      return (
                        <Fragment key={roomnumb}>
                          {!check && (
                            <label>
                              <span>{roomnumb}</span>
                              <br />
                              <input
                                onClick={handeCheck}
                                className="checkbox"
                                type="checkbox"
                                _id={room._id}
                                number-room={roomnumb}
                                price={room.price}
                                start-date={startDate}
                                end-date={endDate}
                              />
                            </label>
                          )}
                        </Fragment>
                      );
                    })}

                    {/* ------------------------------------ */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* total bill */}
      <div className="mx-auto mt-5 " style={{ width: "960px" }}>
        <h4>
          Total Bills: $
          <span id="total">{numberOfDays * totalPriceAllRoom}</span>
        </h4>
        <div className="d-flex gap-5">
          <select
            onClick={(e) => {
              setPayment(e.target.value);
            }}
            className="form-select w-50"
            aria-label="Default select example"
          >
            <option value="">Select Payment Method</option>
            <option value="Cash">Cash</option>
            <option value="Credit Cash">Credit Cash</option>
          </select>
          <button onClick={handleReserve} className="btn btn-success">
            Reserve Now
          </button>
        </div>
      </div>
    </>
  );
}
export default ReserverBook;

function fetchApi(
  rooms,
  payment,
  hotelId,
  startDate,
  endDate,
  totalPrice,
  navigate
) {
  fetch("http://localhost:5000/user/addReserve", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: JSON.parse(localStorage.getItem("token")),
      rooms,
      hotelId,
      payment,
      startDate,
      endDate,
      totalPrice,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      navigate("/transaction");
    });
}

// get all transaction
function getTransaction(hotelId, setTransaction) {
  fetch("http://localhost:5000/user/transaction-detail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      token: JSON.parse(localStorage.getItem("token")),
      hotelId,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setTransaction(data);
    });
}

// kiem tra n2 khoang thoi gian co trung nhau hay khong

function coNgayTrungNhau(khoangThoiGian1, khoangThoiGian2) {
  if (
    khoangThoiGian1.batDau <= khoangThoiGian2.ketThuc &&
    khoangThoiGian1.ketThuc >= khoangThoiGian2.batDau
  ) {
    return true; // Có ngày trùng nhau
  } else {
    return false; // Không có ngày trùng nhau
  }
}
