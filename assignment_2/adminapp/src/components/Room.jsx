import React, { useState, useEffect } from "react";

function NewRoom({ handleAddNewRoom, setEditRoom }) {
  const [rooms, setRooms] = useState(null);
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/admin/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, [rerender]);

  const handleDelete = (e) => {
    const confirm = window.confirm("bạn có muốn xóa không?");
    if (confirm) {
      fetch("http://localhost:5000/admin/delet-room", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomId: e.target.getAttribute("id-room"),
          token: JSON.parse(localStorage.getItem("admin")).token,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setRerender(!rerender);
        });
    }
  };

  const handleEdit = (e) => {
    fetch(
      `http://localhost:5000/admin/get-edit-room/${e.target.getAttribute(
        "id-room"
      )}`,
      {
        method: "POST",
        body: JSON.stringify({
          token: JSON.parse(localStorage.getItem("admin")).token,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEditRoom(data);
        handleAddNewRoom();
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>Rooms list</h3>
        <button onClick={handleAddNewRoom} className="btn btn-success">
          add new
        </button>
      </div>
      <table className="table text-start ">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Max people</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rooms &&
            rooms.map((room) => {
              return (
                <tr key={room._id}>
                  <th>
                    <input type="checkbox" />
                    <span className="mx-3 ">{room._id}</span>
                  </th>
                  <td>{room.title}</td>
                  <td className="w-25">{room.desc}</td>
                  <td>${room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <button
                      onClick={handleEdit}
                      id-room={room._id}
                      className="btn btn-warning mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={handleDelete}
                      id-room={room._id}
                      className="btn btn-danger"
                    >
                      delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}
export default NewRoom;
