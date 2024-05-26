import React, { useContext } from "react";
import NavBar from "./NavBar/NavBar"; // import component navbar
import Banner from "./Banner/Banner"; // import component banner
import MovieList from "./MovieList/MovieList"; // import component movielist
// import UrlContextAPI và useHttp
import UrlContextAPI from "../../Hooks/UrlContextAPI";
import useHttp from "../../Hooks/useHttp";

// tại đây ta sẽ lấy toàn bộ dữ liệu của các mục như: Original,banner, xu hướng, xếp hạng cao,.... từ API lấy về
function Browse() {
  // Original
  const { fetchNetflixOriginals } = React.useContext(UrlContextAPI);
  const dataOriginal = useHttp(fetchNetflixOriginals, false);
  // banner
  let movieBanner;
  if (dataOriginal.movies) {
    const index = Math.floor(Math.random() * 20);
    movieBanner = dataOriginal.movies.results[index];
  }
  // xu hướng
  const { fetchTrending } = React.useContext(UrlContextAPI);
  const datafetchTrending = useHttp(fetchTrending, true);
  //xếp hạng cao
  const { fetchTopRated } = React.useContext(UrlContextAPI);
  const datafetchTopRated = useHttp(fetchTopRated, true);
  // hành động
  const { fetchActionMovies } = React.useContext(UrlContextAPI);
  const datafetchActionMovies = useHttp(fetchActionMovies, true);
  // hài
  const { fetchComedyMovies } = React.useContext(UrlContextAPI);
  const datafetchComedyMovies = useHttp(fetchComedyMovies, true);
  // kinh dị
  const { fetchHorrorMovies } = React.useContext(UrlContextAPI);
  const datafetchHorrorMovies = useHttp(fetchHorrorMovies, true);
  // lãng mạng
  const { fetchRomanceMovies } = React.useContext(UrlContextAPI);
  const datafetchRomanceMovies = useHttp(fetchRomanceMovies, true);
  // tài liệu
  const { fetchDocumentaries } = React.useContext(UrlContextAPI);
  const datafetchDocumentaries = useHttp(fetchDocumentaries, true);

  // đưa toàn bộ dữ liệu đã lấy về từ api vào component MovieList thông qua props
  return (
    <div className="app">
      <NavBar></NavBar>
      <Banner movieBanner={movieBanner}></Banner>
      <MovieList
        datamovieOriginal={dataOriginal.movies}
        datafetchTrending={datafetchTrending.movies}
        datafetchTopRated={datafetchTopRated.movies}
        datafetchActionMovies={datafetchActionMovies.movies}
        datafetchComedyMovies={datafetchComedyMovies.movies}
        datafetchHorrorMovies={datafetchHorrorMovies.movies}
        datafetchRomanceMovies={datafetchRomanceMovies.movies}
        datafetchDocumentaries={datafetchDocumentaries.movies}
      ></MovieList>
    </div>
  );
}

export default React.memo(Browse); // sử dụng react memo để ngăn không cho component Browse bị rerender khi dữ liệu truyền vào không bị thay đổi
