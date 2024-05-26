import { useNavigate } from "react-router-dom";
import React from "react";
import "./Hotel.css";

const Hotel = ({ hotelList }) => {
  const navigate = useNavigate();

  const handleDetail = (e) => {
    const hotelId = e.target.getAttribute("hotelid");
    fetch(`http://localhost:5000/hotels/${hotelId}`)
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("hotelDetail", JSON.stringify(data));
        navigate("/detail");
      });
  };
  return (
    <ul id="content-hotel">
      {hotelList &&
        hotelList.map((el, i) => {
          if (i > 2) {
            return;
          }
          return (
            <li key={el._id}>
              <img src={el.photos[0]}></img>
              <a href="#" hotelid={el._id} onClick={handleDetail}>
                {el.title}
              </a>
              <p>{el.city}</p>
              <p>starting from ${el.cheapestPrice}</p>
            </li>
          );
        })}
    </ul>
  );
};
export default Hotel;
