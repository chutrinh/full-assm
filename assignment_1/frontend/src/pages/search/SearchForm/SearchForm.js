import React from "react"; //import thư viện react
import "./SearchForm.css"; // import file css để css cho component

// tại đây ta sẽ thực hiện việc gửi yêu cầu đi và tìm kiếm danh sách bộ phim theo từ khóa
function SearchForm({ getData }) {
  const keyword = React.useRef();
  const genre = React.useRef();
  const typeMedia = React.useRef();
  const language = React.useRef();
  const year = React.useRef();
  const page = React.useRef();
  // xũ lý sự kiện khi người dùng nhấp vào ô tìm kiếm sẽ thực hiện tìm kiếm danh sách bộ phim theo yêu cầu và đưa ra các thông báo cho người dùng biết nếu không nhập gì cả vào ô tìm kiếm
  const handleSeacrMovie = (e) => {
    e.preventDefault();

    let keyword_value = keyword.current.value;
    let genre_value = genre.current.value;
    let typeMedia_value = typeMedia.current.value;
    let language_value = language.current.value;
    let year_value = year.current.value;
    let page_value = page.current.value;

    fetch(
      `http://localhost:5000/api/movies/search?userToken=8qlOkxz4wq&page=${page_value}&genre=${genre_value}&mediaType=${typeMedia_value}&language=${language_value}&year=${year_value}`,
      {
        method: "POST",
        body: JSON.stringify({ keyword: keyword_value }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if ("results" in data) {
          getData(data);
          keyword.current.value = "";
          genre.current.value = "Action";
          typeMedia.current.value = "all";
          language.current.value = "en";
          year.current.value = "";
          page.current.value = 1;
        } else {
          getData(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    keyword_value = "";
  };

  return (
    <>
      <div className="form">
        <form className="form-container">
          <div className="input-form">
            <div className="input-container">
              <label>Keyword</label>
              <input
                className="input"
                ref={keyword}
                placeholder="Keyword"
              ></input>
              <label>Genre</label>
              <select ref={genre} className="input">
                <option value="">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Animation">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Family">Family</option>
                <option value="Fantasy">Fantasy</option>
                <option value="History">History</option>
                <option value="Horror">Horror</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science">Science Fiction</option>
                <option value="TV Movie">TV Movie</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
              </select>
              <label>Type movie</label>
              <select ref={typeMedia} className="input">
                <option value="all">All</option>
                <option value="movie">movie</option>
                <option value="tv">tv</option>
                <option value="person">person</option>
              </select>
              <label>Language</label>
              <select ref={language} className="input">
                <option value="">All</option>
                <option value="en">en</option>
                <option value="js">ja</option>
                <option value="ko">ko</option>
              </select>
              <label>Year</label>
              <input
                type="number"
                className="input"
                ref={year}
                placeholder="All"
              ></input>
              <label>Page</label>
              <input
                type="number"
                className="input"
                ref={page}
                placeholder="Page"
                defaultValue={1}
                min={1}
              ></input>
            </div>
          </div>
          <hr></hr>
          <div className="btn-search">
            <button>RESET</button>
            <button onClick={handleSeacrMovie}>SEARCH</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default SearchForm; // xuất dữ liệu ra ngoài
