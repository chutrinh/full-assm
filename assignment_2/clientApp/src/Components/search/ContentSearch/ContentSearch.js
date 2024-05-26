import React from "react"; // import thư viện react
import "./ContentSearch.css"; // import file contentsearch để css cho component hiện tại
import TableContent from "../TableContent/TableContent"; // import component tableComponent

// tạo component contentSearch
const ContentSearch = () => {
  return (
    <div id="content-search">
      <div className="content-search-container">
        <form className="form-search">
          <h3>Search</h3>
          <label>Destination</label>
          <textarea cols={10} rows={3} placeholder="nhập mô tả"></textarea>
          <label>Checkin Date</label>
          <input
            className="check-date"
            type="text"
            placeholder="06/24/2022 to 06/24/2022"
          ></input>
          <div className="option">
            <p>Option</p>
            <label>
              Min price per night
              <input type="text"></input>
            </label>
            <label>
              Max price per night
              <input type="text"></input>
            </label>
            <label>
              Adult
              <input placeholder={1} type="text"></input>
            </label>
            <label>
              Children
              <input type="text" placeholder={0}></input>
            </label>
            <label>
              Room
              <input type="text" placeholder={1}></input>
            </label>
          </div>
          <input type="submit"></input>
        </form>
        <TableContent></TableContent>
      </div>
      <h1></h1>
    </div>
  );
};
export default ContentSearch; // xuất dữ liệu component ra ngoài
