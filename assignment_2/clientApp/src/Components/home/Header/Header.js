import React, { useRef, useState, useContext } from "react";
import "./Header.css";
import Calendar from "./Date";
import useDataRange from "../../hooks/useDate";
import { useNavigate } from "react-router-dom";
import { StroreContext } from "../../store/store";

const Header = (props) => {
  const [hidden, setHidden] = useState("hidden");
  const naviagte = useNavigate();
  const { setDataSearch } = useContext(StroreContext);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const showDate = {
    start: `${new Date(startDate).getFullYear()}-${
      new Date(startDate).getMonth() + 1
    }-${new Date(startDate).getDate()}`,
    end: `${new Date(endDate).getFullYear()}-${
      new Date(endDate).getMonth() + 1
    }-${new Date(endDate).getDate()}`,
  };

  document.addEventListener("click", function (e) {
    const parentElement = document.getElementById("tableDate");
    if (parentElement && !parentElement.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      setHidden("hidden");
    }
  });
  const handleDate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hidden === "hidden") {
      setHidden("");
    } else {
      setHidden("hidden");
    }
  };

  // tạo hàm onchange giã để trường input không bị báo lỗi
  function change() {}
  const valueDate = useRef();
  const city = useRef();
  const maxPeople = useRef();
  const handleSearch = () => {
    if (!city.current.value) {
      alert("vui lòng nhập thành phố bạn muốn tìm");
      return;
    }
    if (!valueDate.current.value) {
      alert("vui lòng chọn ngày");
      return;
    }

    if (!maxPeople.current.value) {
      alert("vui lòng nhập input số người và số phòng ");
      return;
    } else {
      const arr = maxPeople.current.value.split(",");
      if (arr.length > 2) {
        alert("chỉ duy nhất 1 dấu phẩy");
        return;
      }
      if (!/^[0-9,]*$/.test(maxPeople.current.value)) {
        alert(
          "không được chứa chữ hoặc ký tự đặt biệt. ngoại trừ dấy phẩy và sô"
        );
        return;
      }
    }
    const data = {
      city: city.current.value,
      startDate: showDate.start,
      endDate: showDate.end,
      maxPeople: Number(maxPeople.current.value.split(",")[0]),
      amountRoom: Number(maxPeople.current.value.split(",")[1]),
    };

    fetch("http://localhost:5000/search", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data !== "no found") {
          const dataNew = data.filter((item) => item !== null);
          setDataSearch(dataNew);
          naviagte("/search");
        } else {
          setDataSearch("");
          naviagte("/search");
          // alert("không tìm thấy");
        }
      });
  };

  const [note, setNote] = useState(false);

  const handleshowNote = () => {
    setNote((prevNote) => !prevNote);
    // setTimeout(() => {
    //   setNote((prevNote) => !prevNote);
    // }, 20000);
  };

  return (
    <div id="header">
      <div className="header-container">
        <h1>A lifetime of discounts? It's genius</h1>
        <p>
          Get rewarded for your travels - unlock instant saving of 10% or more
          with a free account
        </p>
        <button className="header-btn">sign in / Register</button>
        <form id="form-header">
          <div>
            <i className="fa fa-bed"></i>
            <input ref={city} type="text" placeholder="where are you going?" />
          </div>
          <div>
            <i className="fa fa-calendar"></i>
            <input
              ref={valueDate}
              type="text"
              onClick={handleDate}
              value={
                startDate ? " " + showDate.start + " to " + showDate.end : ""
              }
              onChange={change}
              placeholder=" click here to choose date"
            />
            <div id="tableDate" className={hidden}>
              <Calendar
                dataRanges={{
                  useDataRange,
                  setStartDate,
                  setEndDate,
                  setNumberOfDays: () => {},
                }}
              ></Calendar>
            </div>
          </div>
          <div>
            <i className="fa fa-female"></i>
            <input
              onClick={handleshowNote}
              ref={maxPeople}
              type="text"
              placeholder="    people, room. ví dụ: 2,2"
            />
          </div>
          {/* click vào nút search để chuyển hướng đến trang search */}
          <button onClick={handleSearch} className="btn-search">
            Search
          </button>
        </form>
        {note && (
          <p className="note">ví dụ: 2 người và 2 phòng thì nhập là: 2,2</p>
        )}
      </div>
    </div>
  );
};
export default Header; //xuất dữ liệu ra ngoài
