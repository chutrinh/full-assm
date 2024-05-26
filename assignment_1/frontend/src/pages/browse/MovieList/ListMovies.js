import React, { useEffect, useRef, useState } from "react"; // import thư viện react
import "./MovieList.css"; // import file css vào cho component ListMovie

// đây là nơi thực hiện hiển thị các danh sách bộ phim theo chủ để, như Original,banner, xu hướng, xếp hạng cao,....
// componet này dựa vào 3 tham số đã nhận là title, dataMovie, và tên class thì sẽ render ra danh sách bộ phim tương ứng có tiêu đề và danh sách phim
let lastMOvie;
let lastId;
function ListMovies({ title, dataMovie, classs }) {
  let [dataMovieFetch, setDataMovieFetch] = useState({});
  const [dataDetailInfoItem, setDataDetailItem] = useState();

  if ("className" in dataMovieFetch) {
    if (dataMovieFetch.data.result) {
      document.querySelector(
        `.${dataMovieFetch.className}`
      ).innerHTML = `<div class = "box" style="display: flex; justify-content: space-between">
    <div style="width: 50%; padding-left: 20px; color: white">
      <h2>${
        dataMovieFetch.className === "portalOriginal"
          ? dataDetailInfoItem.original_name
          : dataDetailInfoItem.original_title
      }</h2>
      <hr />
      <p>Release Date: ${
        dataMovieFetch.className === "portalOriginal"
          ? dataDetailInfoItem.first_air_date
          : dataDetailInfoItem.release_date
      }</p>
      <p>Vote: ${dataDetailInfoItem.vote_average}</p>
      <p style = "padding-right: 30px; text-align: justify">${
        dataDetailInfoItem.overview
      }</p>
    </div>
    <div style="width: 50%; height: 400px; padding-right: 20px">
      <iframe
        width="100%"
        height="400"
        style = "border-radius: 10px"
        src="https://www.youtube.com/embed/${dataMovieFetch.data.result.key}"
      ></iframe>
    </div>
  </div>`;
    } else {
      document.querySelector(
        `.${dataMovieFetch.className}`
      ).innerHTML = `<div class = "box" style="display: flex; justify-content: space-between">
    <div style="width: 50%; padding-left: 20px;color: white">
      <h2>${
        dataMovieFetch.className === "portalOriginal"
          ? dataDetailInfoItem.original_name
          : dataDetailInfoItem.original_title
      }</h2>
      <hr />
      <p>Release Date: ${
        dataMovieFetch.className === "portalOriginal"
          ? dataDetailInfoItem.first_air_date
          : dataDetailInfoItem.release_date
      }</p>
      <p>Vote: ${dataDetailInfoItem.vote_average}</p>
      <p style = "padding-right: 30px; text-align: justify">${
        dataDetailInfoItem.overview
      }</p>
    </div>
    <div style="width: 50%; height: 400px; padding-right: 20px">
      <img
        width="100%"
        height="400"
        style = "border-radius: 10px"
        src= "https://image.tmdb.org/t/p/original${
          dataDetailInfoItem.backdrop_path
        }"
      ></img>
    </div>
  </div>`;
    }
    // }
  }

  const getRender = (id, className) => {
    dataMovie.results.map((item) => {
      if (item.id == id) {
        setDataDetailItem(item);
      }
    });

    const sending = async (movie_id) => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/movies/video?film_id=${movie_id}&userToken=8qlOkxz4wq`
        );
        const data = await res.json();
        console.log(data);
        setDataMovieFetch({ data, className });
      } catch (error) {
        console.log(error);
      }
    };
    sending(id);
    lastId = id;
  };
  //  xữ lý sự khiện khi người dùng thực hiện click vào một bộ phim bất kỳ sẽ hiển thị hông tin bộ phim đó ngay bên dưới danh sách phim hiện tại và giữa chuột và kéo sang ngang sẽ di chuyển thanh scroll-x

  //  ----------------------------------------------------
  let isShow;
  let show = true;
  lastMOvie = dataMovieFetch;
  const onclickMouseDown = (e) => {
    e.preventDefault();
    isShow = setTimeout(() => {
      show = false;
    }, 200);
  };
  const onclickMouseUp = (e) => {
    clearTimeout(isShow);
    if (show) {
      if (lastMOvie.hasOwnProperty("className")) {
        document.querySelector(`.${lastMOvie.className}`).innerHTML = "";
      }
      if (dataMovieFetch.hasOwnProperty("className")) {
        document.querySelector(`.${dataMovieFetch.className}`).innerHTML = "";
        setDataMovieFetch({});
        const id = e.target.closest("li").getAttribute("id");
        const className =
          e.target.closest("ul").nextElementSibling.classList[0];
        if (id !== lastId) {
          getRender(id, className);
        }
      } else {
        const id = e.target.closest("li").getAttribute("id");
        const className =
          e.target.closest("ul").nextElementSibling.classList[0];
        getRender(id, className);
      }
    }
    show = true;
  };
  // ----------------------------------------

  useEffect(() => {
    // scroll
    const ul = document.querySelectorAll(".scrollListMovie");
    ul.forEach((item) => {
      let isMouseDown = false;
      let startX;
      let scrollLeft;
      item.addEventListener("mousedown", (e) => {
        isMouseDown = true;
        startX = e.pageX - item.offsetLeft;
        scrollLeft = item.scrollLeft;
      });

      item.addEventListener("mouseleave", () => {
        isMouseDown = false;
      });

      item.addEventListener("mouseup", () => {
        isMouseDown = false;
      });

      item.addEventListener("mousemove", (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - item.offsetLeft;
        const walk = (x - startX) * 1; // Tốc độ cuộn
        item.scrollLeft = scrollLeft - walk;
      });
    });
  }, []);
  // ---------------------------------------

  return (
    <>
      <h2>{title}</h2>
      <ul className={`${classs} scrollListMovie`}>
        {dataMovie ? (
          dataMovie.check ? (
            dataMovie.results.map((movie) => {
              return (
                <li key={movie.id} id={movie.id}>
                  <img
                    onMouseDown={onclickMouseDown}
                    onMouseUp={onclickMouseUp}
                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  ></img>
                </li>
              );
            })
          ) : (
            <h1>{dataMovie.message}</h1>
          )
        ) : (
          <h1>Loading...</h1>
        )}
      </ul>
    </>
  );
}
export default ListMovies; //xuất dữ liệu ra ngoài
