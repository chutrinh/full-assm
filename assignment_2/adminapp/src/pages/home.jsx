import React, { useState } from "react";
import Dashboard from "../components/Dashboard";
import HotelList from "../components/hotelList";
import Rooms from "../components/Room";
import AddNewRoom from "../components/addNewRoom";
import AddNewHotel from "../components/addNewHotel";
import Transactions from "../components/transaction";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function HomAdmin() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("admin"))) {
      navigate("/");
    }
  }, []);

  const [dashboard, setDashboard] = useState(true);
  const [hotelList, sethotelList] = useState(false);
  const [newRoom, setRoom] = useState(false);
  const [addNewRoom, setAddNewRoom] = useState(false);
  const [addNewHotel, setAddNewHotel] = useState(false);
  const [transaction, setTransaction] = useState(false);

  const [editHotel, setEditHotel] = useState(false);
  const [editRoom, setEditRoom] = useState(false);
  const [rerender, setRerender] = useState(false);

  const handleDashborad = () => {
    sethotelList(false);
    setRoom(false);
    setAddNewRoom(false);
    setAddNewHotel(false);
    setDashboard(true);
    setTransaction(false);
    setEditHotel(false);
    setEditRoom(false);
    setRerender(!rerender);
  };
  const handlehotelList = () => {
    sethotelList(true);
    setRoom(false);
    setAddNewRoom(false);
    setAddNewHotel(false);
    setDashboard(false);
    setTransaction(false);
    setEditHotel(false);
    setEditRoom(false);
  };
  const handleRoom = () => {
    sethotelList(false);
    setRoom(true);
    setAddNewRoom(false);
    setAddNewHotel(false);
    setDashboard(false);
    setTransaction(false);
    setEditHotel(false);
    setEditRoom(false);
  };
  const handleAddNewRoom = () => {
    sethotelList(false);
    setRoom(false);
    setAddNewRoom(true);
    setAddNewHotel(false);
    setDashboard(false);
    setTransaction(false);
    setEditHotel(false);
  };
  const handleAddNewHotel = () => {
    sethotelList(false);
    setRoom(false);
    setAddNewRoom(false);
    setAddNewHotel(true);
    setDashboard(false);
    setTransaction(false);
    setEditRoom(false);
  };
  const handleTransaction = () => {
    sethotelList(false);
    setRoom(false);
    setAddNewRoom(false);
    setAddNewHotel(false);
    setDashboard(false);
    setTransaction(true);
    setEditHotel(false);
    setEditRoom(false);
  };
  return (
    <>
      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-2 border-end">
            <h4 className="text-center">Admin page</h4>
          </div>
          <div className="col-10 border-bottom"></div>
        </div>
        <div className="row ">
          <div className="col-2 p-0">
            <div className="list-group ">
              <div className="list-group-item">
                <p> Main</p>
                <i className="fa-solid fa-house mx-2"></i>
                <a className="dashboard" onClick={handleDashborad}>
                  Dashboard
                </a>
              </div>

              <div className="list-group-item">
                <p>List</p>
                <div className="mx-2">
                  <i className="fa-solid fa-user me-2"></i>
                  <a className="user">User</a> <br />
                  <i className="fa-solid fa-hotel me-2"></i>
                  <a className="hotels" onClick={handlehotelList}>
                    Hotels
                  </a>
                  <br />
                  <i className="fa-solid fa-person-booth me-1"></i>
                  <a className="rooms" onClick={handleRoom}>
                    Rooms
                  </a>
                  <br />
                  <i className="fa-solid fa-tent-arrow-left-right me-2"></i>
                  <a className="transaction" onClick={handleTransaction}>
                    Transaction
                  </a>
                </div>
              </div>

              <div className="list-group-item">
                <p>New</p>
                <div className="mx-2">
                  <i className="fa-solid fa-file me-2"></i>
                  <a className="newhotel" onClick={handleAddNewHotel}>
                    New Hotel
                  </a>
                  <br />
                  <i className="fa-solid fa-file me-2"></i>
                  <a className="newroom" onClick={handleAddNewRoom}>
                    New Room
                  </a>
                </div>
              </div>

              <div className="list-group-item">
                <p>User</p>
                <div className="mx-2">
                  <i className="fa-solid fa-right-from-bracket me-2"></i>
                  <a
                    onClick={() => {
                      localStorage.removeItem("admin");
                      navigate("/");
                    }}
                    className="logout"
                  >
                    log out
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-10" style={{ padding: "40px" }}>
            <div className="row">
              {dashboard && <Dashboard rerender={rerender} />}
              {hotelList && (
                <HotelList
                  handleAddNewHotel={handleAddNewHotel}
                  setEditHotel={setEditHotel}
                  rerender={rerender}
                />
              )}
              {newRoom && (
                <Rooms
                  handleAddNewRoom={handleAddNewRoom}
                  setEditRoom={setEditRoom}
                />
              )}
              {addNewRoom && (
                <AddNewRoom handleRoom={handleRoom} editRoom={editRoom} />
              )}
              {addNewHotel && (
                <AddNewHotel
                  handlehotelList={handlehotelList}
                  editHotel={editHotel}
                />
              )}
              {transaction && <Transactions />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default HomAdmin;
