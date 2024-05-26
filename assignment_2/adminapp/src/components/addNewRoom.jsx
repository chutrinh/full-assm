import React, { Fragment, useState, useEffect, useRef } from "react";

function AddNewRoom({ handleRoom, editRoom }) {
  const title = useRef();
  const price = useRef();
  const description = useRef();
  const maxPeople = useRef();
  const rooms = useRef();
  const chooseHotel = useRef();

  const [hotels, setHotel] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/admin/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotel(data);
      });
  }, []);

  const handleSend = () => {
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value,
      maxPeople: maxPeople.current.value,
      rooms: rooms.current.value.split(",").map((item) => Number(item)),
      chooseHotelId: chooseHotel.current.value,
      token: JSON.parse(localStorage.getItem("admin")).token,
    };

    if (!data.title) {
      alert("vui lòng nhập input title");
      return;
    }
    if (!data.price) {
      alert("vui lòng nhập input price");
      return;
    }
    if (!data.description) {
      alert("vui lòng nhập input description");
      return;
    }
    if (!data.maxPeople) {
      alert("vui lòng nhập input maxPeople");
      return;
    }

    if (!rooms.current.value) {
      alert("vui lòng nhập input rooms ");
      return;
    } else {
      if (data.rooms.includes(0)) {
        alert("kiểm tra dấu phẩy");
        return;
      }

      if (!/^[0-9,]*$/.test(rooms.current.value)) {
        alert("room không hợp lệ, rooms chỉ số sau đó là dấu phẩy");
        return;
      }
    }
    if (!data.chooseHotelId) {
      alert("vui lòng nhập input chooseHotelId");
      return;
    }

    fetch(
      `http://localhost:5000/admin/${
        editRoom ? "post-edit-room/" + editRoom._id : "add-room"
      }`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        handleRoom();
      });
  };
  return (
    <>
      <div className="col-5">
        <div className="mb-3">
          <label>Title</label>
          <input
            ref={title}
            type="text"
            className="form-control"
            defaultValue={editRoom ? editRoom.title : ""}
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            ref={price}
            type="number"
            className="form-control"
            defaultValue={editRoom ? editRoom.price : ""}
          />
        </div>
      </div>

      <div className="col-2"></div>

      <div className="col-5">
        <div className="mb-3">
          <label>Description</label>
          <input
            ref={description}
            type="text"
            className="form-control"
            defaultValue={editRoom ? editRoom.desc : ""}
          />
        </div>
        <div className="mb-3">
          <label>Max People</label>
          <input
            ref={maxPeople}
            type="number"
            className="form-control"
            defaultValue={editRoom ? editRoom.maxPeople : ""}
          />
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-4">
          <label>Rooms</label> <br />
          <input
            ref={rooms}
            type="text"
            className="form-control"
            defaultValue={editRoom ? editRoom.roomNumbers.join() : ""}
          />
        </div>
        <div className="col-5" style={{ paddingLeft: "150px" }}>
          <label>Choose a hotel</label> <br />
          <select
            ref={chooseHotel}
            className="w-50 mt-2"
            // defaultChecked={editRoom ? editRoom.hotel[0] : ""}
          >
            <option value="">Choose a hotel</option>
            {hotels &&
              hotels.map((hotel) => {
                return (
                  <Fragment key={hotel._id}>
                    <option value={hotel._id}>{hotel.title}</option>
                  </Fragment>
                );
              })}
          </select>
        </div>
        <div className="col-2 mt-4">
          <button onClick={handleSend} className="btn btn-success w-50">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
export default AddNewRoom;
