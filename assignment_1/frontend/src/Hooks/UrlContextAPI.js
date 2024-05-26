import React from "react"; //impoer thư viện react
// đưa toàn bộ link api vào một object để dễ dàng quản lý và sử dụng
const API_KEY = "ecdccbc6db9089b36fd6df2185e5a3cd";
const token = "8qlOkxz4wq";
const requests = {
  fetchTrending: `/trending/?userToken=${token}&page=1`,
  fetchTopRated: `/top-rate?userToken=${token}&page=1`,

  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_network=123`,

  fetchActionMovies: `/discover?userToken=${token}&genre=28&page=1`,
  fetchComedyMovies: `/discover?userToken=${token}&genre=35&page=1`,
  fetchHorrorMovies: `/discover?userToken=${token}&genre=27&page=1`,
  fetchRomanceMovies: `/discover?userToken=${token}&genre=10749&page=1`,
  fetchDocumentaries: `/discover?userToken=${token}&genre=99&page=1`,

  fetchSearch: `/search/movie?api_key=${API_KEY}&language=en-US`,
};
// đưa dữ liệu ra ngoài
const UrlContextAPI = React.createContext(requests);
export default UrlContextAPI;
