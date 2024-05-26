import React, { useState } from "react";
import "./InforHotel.css";
import ReserverBook from "../ReserveBook/ReserveBook";

//  tạo component inforhotel
const InforHotel = () => {
  const [reserve, setReserve] = useState(false);
  const data = JSON.parse(localStorage.getItem("hotelDetail"));
  const hotel = data.hotel;
  if (!hotel) {
    return (
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        không tìm thấy hotel
      </h1>
    );
  }

  return (
    <>
      <div id="inforHotel">
        <div className="inforHotel-container">
          <div className="inforHotel-title">
            <h2>{hotel.name}</h2>
            <button>Reverve or Book Now</button>
          </div>
          <p>{hotel.address}</p>
          <p className="inforHotel-distance">
            Excellent location - {hotel.distance}m from center
          </p>
          <p>
            Book a stay over ${hotel.cheapestPrice} at this property and get a
            free airport taxi
          </p>
          <ul className="infor-img">
            {hotel.photos.map((el, i) => {
              return (
                <li key={i}>
                  <img src={el}></img>
                </li>
              );
            })}
          </ul>
          <div className="infor-descripts">
            <div className="descripts-title">
              <h3>{hotel.title}</h3>
              <p>{hotel.desc}</p>
            </div>
            <div className="descripts-adverment">
              <h3>{/* Perfect for a 9-night stay! */}</h3>
              <p>
                {/* Located in the real heart of krakow, this property has an
              execllent location score of 9.81 */}
              </p>
              <p>
                <b> ${hotel.cheapestPrice} </b>(1 night)
              </p>
              <button onClick={() => setReserve(!reserve)}>
                Reverve or Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
      {reserve && (
        <ReserverBook
          hotel={hotel}
          transaction={data.transaction}
          id={hotel._id}
        />
      )}
    </>
  );
};
export default InforHotel; // xuất dữ liệu ra ngoài
