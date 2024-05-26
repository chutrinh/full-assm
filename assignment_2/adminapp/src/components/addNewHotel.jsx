import React, { useEffect, useRef, useState } from "react";

function AddNewHotel({ handlehotelList, editHotel }) {
  const [rooms, setRooms] = useState();
  const namee = useRef();
  const city = useRef();
  const distance = useRef();
  const description = useRef();
  const images = useRef();
  const type = useRef();
  const address = useRef();
  const title = useRef();
  const price = useRef();
  const featured = useRef();
  const rating = useRef();

  useEffect(() => {
    fetch("http://localhost:5000/admin/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  const handleSend = () => {
    const tickBox = [];
    const checkbox = document.querySelectorAll(".check-box");
    checkbox.forEach((item) => {
      if (item.checked) {
        tickBox.push(item.getAttribute("id-room"));
      }
    });

    const data = {
      name: namee.current.value,
      city: city.current.value,
      distance: Number(distance.current.value),
      description: description.current.value,
      images: images.current.value.split(","),
      type: type.current.value,
      address: address.current.value,
      title: title.current.value,
      price: Number(price.current.value),
      featured: featured.current.value === "true" ? true : false,
      rating: Number(rating.current.value),
      checkbox: tickBox,
      token: JSON.parse(localStorage.getItem("admin")).token,
    };

    if (!namee.current.value) {
      alert("vui lòng nhận input name");
      return;
    }
    if (!city.current.value) {
      alert("vui lòng nhận input city");
      return;
    }
    if (!distance.current.value) {
      alert("vui lòng nhận input distance");
      return;
    }
    if (!description.current.value) {
      alert("vui lòng nhận input description");
      return;
    }
    if (!images.current.value) {
      alert("vui lòng nhận input images");
      return;
    }
    if (!type.current.value) {
      alert("vui lòng nhận input type");
      return;
    }
    if (!address.current.value) {
      alert("vui lòng nhận input address");
      return;
    }
    if (!title.current.value) {
      alert("vui lòng nhận input title");
      return;
    }
    if (!price.current.value) {
      alert("vui lòng nhận input price");
      return;
    }
    if (!rating.current.value) {
      alert("vui lòng nhận input rating");
      return;
    }
    if (!tickBox.length > 0) {
      alert("vui lòng nhận input rooms");
      return;
    }
    fetch(
      `http://localhost:5000/admin/${
        editHotel ? "post-edit-hotel/" + editHotel._id : "add-hotel"
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
        handlehotelList();
      });
  };

  return (
    <>
      <div className="col-5">
        <div className="mb-3">
          <label>Name</label>
          <input
            ref={namee}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.name : ""}
          />
        </div>
        <div className="mb-3">
          <label>City</label>
          <input
            ref={city}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.city : ""}
          />
        </div>
        <div className="mb-3">
          <label>Distance from city center</label>
          <input
            ref={distance}
            type="number"
            className="form-control"
            defaultValue={editHotel ? editHotel.distance : ""}
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <input
            ref={description}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.desc : ""}
          />
        </div>
        <div className="mb-3">
          <label>images</label>
          <input
            ref={images}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.photos.join() : ""}
          />
        </div>
      </div>
      <div className="col-2"></div>
      <div className="col-5">
        <div className="mb-3">
          <label>Type</label>
          <input
            ref={type}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.type : ""}
          />
        </div>
        <div className="mb-3">
          <label>Address</label>
          <input
            ref={address}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.address : ""}
          />
        </div>
        <div className="mb-3">
          <label>Title</label>
          <input
            ref={title}
            type="text"
            className="form-control"
            defaultValue={editHotel ? editHotel.title : ""}
          />
        </div>
        <div className="mb-3">
          <label>Price</label>
          <input
            ref={price}
            type="number"
            className="form-control"
            defaultValue={editHotel ? editHotel.cheapestPrice : ""}
          />
        </div>
        <div className="mb-3">
          <label>Rating </label>
          <input
            ref={rating}
            type="number"
            className="form-control"
            defaultValue={editHotel ? editHotel.rating : ""}
          />
        </div>
        <div className="mb-3">
          <label>featured</label> <br />
          <select
            ref={featured}
            style={{ width: "15%" }}
            defaultValue={editHotel ? editHotel.featured : ""}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>

      <div className="row mt-3">
        <label>Rooms</label> <br />
        <div
          className="col-12 d-flex gap-5 flex-wrap mt-3 border mx-2"
          style={{ height: "100px" }}
        >
          {rooms &&
            rooms.map((room, i) => {
              return (
                <div key={room._id}>
                  <input
                    id={`tick${i}`}
                    type="checkbox"
                    className="check-box mx-2"
                    id-room={room._id}
                    defaultChecked={
                      editHotel && editHotel.rooms.includes(room._id)
                        ? true
                        : false
                    }
                  />
                  <label htmlFor={`tick${i}`}>{room.title}</label>
                </div>
              );
            })}
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-2 ">
          <button onClick={handleSend} className="btn btn-success w-50">
            Send
          </button>
        </div>
      </div>
    </>
  );
}
export default AddNewHotel;
