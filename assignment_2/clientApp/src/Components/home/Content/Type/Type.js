import React, { useEffect, useState } from "react";
import "./Type.css";

const Type = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.json())
      .then((hotels) => {
        const typeHotels = [];
        hotels.forEach((element) => {
          if (typeHotels.length === 0) {
            typeHotels.push({
              type: element.type,
              img: element.photos[0],
              amount: 1,
            });
          } else {
            const index = typeHotels.findIndex(
              (item) => item.type.toLowerCase() === element.type.toLowerCase()
            );
            if (index >= 0) {
              typeHotels[index].amount += 1;
            } else {
              typeHotels.push({
                type: element.type,
                img: element.photos[0],
                amount: 1,
              });
            }
          }
        });

        setHotels(typeHotels);
      });
  }, []);

  return (
    <ul id="content-type">
      {hotels.length > 0 &&
        hotels.map((el, i) => {
          return (
            <li key={i}>
              <img src={el.img}></img>
              <h3>{el.type}</h3>
              <p>
                {el.amount} <span style={{ fontSize: "14px" }}>{el.type}</span>
              </p>
            </li>
          );
        })}
    </ul>
  );
};
export default Type;
