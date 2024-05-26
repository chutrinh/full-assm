import React from "react";
import "./City.css";

const City = ({ city }) => {
  return (
    <ul id="content-city">
      {Object.keys(city).map((el, i) => {
        return (
          <li key={i}>
            <h3>{city[el].name}</h3>
            <p>{city[el].number} properties</p>
            <img src={city[el].image}></img>
          </li>
        );
      })}
    </ul>
  );
};
export default City;
