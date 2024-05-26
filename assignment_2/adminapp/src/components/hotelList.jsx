import React, { useState, useEffect } from "react";

function HotelList({ handleAddNewHotel, setEditHotel }) {
  const [hotels, setHotels] = useState(null);
  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/admin/hotels")
      .then((res) => res.json())
      .then((data) => {
        setHotels(data);
      });
  }, [rerender]);

  const handleDelete = (e) => {
    let confirm = window.confirm("bạn có muốn xóa hotel này hay không?");
    if (confirm) {
      fetch("http://localhost:5000/admin/delet-hotel", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idHotel: e.target.getAttribute("id-hotel"),
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
    const idHotel = e.target.getAttribute("id-hotel");
    fetch(`http://localhost:5000/admin/get-edit-hotel/${idHotel}`, {
      method: "POST",
      body: JSON.stringify({
        token: JSON.parse(localStorage.getItem("admin")).token,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEditHotel(data);
        handleAddNewHotel();
      });
  };

  return (
    <>
      <div className="d-flex justify-content-between">
        <h3>List Hotels</h3>
        <button onClick={handleAddNewHotel} className="btn btn-success">
          new hotel
        </button>
      </div>
      <table className="table text-start ">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Type</th>
            <th>Title</th>
            <th>City</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {hotels &&
            hotels.map((hotel) => {
              return (
                <tr key={hotel._id}>
                  <th>
                    <input type="checkbox" />
                    <span className="mx-3">{hotel._id}</span>
                  </th>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.city}</td>
                  <td>
                    <button
                      onClick={handleEdit}
                      className="btn btn-warning mx-2 "
                      id-hotel={hotel._id}
                    >
                      edit
                    </button>
                    <button
                      onClick={handleDelete}
                      className="btn btn-danger"
                      id-hotel={hotel._id}
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
export default HotelList;
