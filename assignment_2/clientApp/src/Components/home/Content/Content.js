import React from "react";
import "./Content.css";
import City from "./City/City";
import Type from "./Type/Type";
import Hotel from "./Hotel/Hotel";

const Content = (props) => {
  return (
    <div id="content-home">
      <City city={props.city}></City>
      <h3 className="content-title">Browse by property type</h3>
      <Type></Type>
      <h3 className="content-title">Home guests love</h3>
      <Hotel hotelList={props.hotelList}></Hotel>
    </div>
  );
};
export default Content;
