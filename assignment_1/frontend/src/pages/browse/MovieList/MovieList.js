import React from "react"; // import thư viện react
import ListMovies from "./ListMovies"; // import compoent listmovie

// tại component MovieList này ta sẽ nhận vào các dự liệu đã được lấy về từ api cho mỗi chủ để khác nhau thông qua props
function MovieList({
  datamovieOriginal,
  datafetchTrending,
  datafetchTopRated,
  datafetchActionMovies,
  datafetchComedyMovies,
  datafetchHorrorMovies,
  datafetchRomanceMovies,
  datafetchDocumentaries,
}) {
  // thực hiện gọi componet ListMovie và truyền vào cho dữ liệu cho title, dataMovie và tên class, cho mỗi chủ đề tương ứng
  return (
    <>
      <div>
        <ListMovies
          title=""
          dataMovie={datamovieOriginal}
          classs="Original"
        ></ListMovies>

        <div className="portalOriginal "></div>
        <ListMovies
          title="Xu hướng"
          dataMovie={datafetchTrending}
          classs="list-movie"
        ></ListMovies>

        <div className="portalTrending "></div>

        <ListMovies
          title="Xếp hạng cao"
          dataMovie={datafetchTopRated}
          classs="list-movie"
        ></ListMovies>

        <div className="portalTopRate "></div>

        <ListMovies
          title="Hành động"
          dataMovie={datafetchActionMovies}
          classs="list-movie"
        ></ListMovies>

        <div className="portalAction "></div>

        <ListMovies
          title="Hài"
          dataMovie={datafetchComedyMovies}
          classs="list-movie"
        ></ListMovies>

        <div className="portalComdy "></div>

        <ListMovies
          title="Kinh dị"
          dataMovie={datafetchHorrorMovies}
          classs="list-movie"
        ></ListMovies>

        <div className="portalHorror "></div>

        <ListMovies
          title="Lãng mạn"
          dataMovie={datafetchRomanceMovies}
          classs="list-movie"
        ></ListMovies>

        <div className="portalRomance "></div>

        <ListMovies
          title="Tài liệu"
          dataMovie={datafetchDocumentaries}
          classs="list-movie"
        ></ListMovies>

        <div className="portalDocument "></div>
      </div>
    </>
  );
}
export default MovieList; //xuất dữ liệu ra ngoài
