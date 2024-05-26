import React from "react"; // import thư viện react
import "./Banner.css"; // import file css vào cho component Banner

// tạo component banner
// tại đây ta sẽ xữ lý dự liệu được nhận vào thông qua props
// ta sẽ thực hiện hiển thị 1 bộ phim làm banner cho trang web
function Banner({ movieBanner }) {
  return (
    <div className="banner">
      <div className="img">
        <img
          src={
            movieBanner &&
            `https://image.tmdb.org/t/p/original/${movieBanner.backdrop_path}`
          }
        ></img>
        <div className="backgr-dark"></div>
      </div>

      <div className="infor-banner">
        <h1>{movieBanner && movieBanner.name}</h1>
        <button>Play</button>
        <button>My list</button>
        <p>{movieBanner && movieBanner.overview}</p>
      </div>
    </div>
  );
}
export default Banner;
