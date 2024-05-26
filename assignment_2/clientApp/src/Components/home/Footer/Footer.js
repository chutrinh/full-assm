import React from "react"; //import thư viện react
import "./Footer.css"; //import file css để css cho nội dụng của component hiện tại.

// tạo component fooeter
const Footer = (props) => {
  return (
    <div id="footer">
      {/* render dữ liệu được lấy ở file data json được truyền  thông qua props*/}
      <div className="footer-ccontainer">
        <ul className="col1">
          {props.footer[0].col_values.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
        <ul className="col2">
          {props.footer[1].col_values.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
        <ul className="col3">
          {props.footer[2].col_values.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
        <ul className="col4">
          {props.footer[3].col_values.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
        <ul className="col5">
          {props.footer[4].col_values.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};
export default Footer; // xuất dữ liệu ra ngoài
