const Movies = require("../models/moviesList");
const paging = require("../utils/paging");
const Genre = require("../models/genreList");
const MediaType = require("../models/mediaType");

exports.search = (req, res, next) => {
  const page = Number(req.query.page);
  const keyword = req.body.keyword;

  const genre = req.query.genre;
  const mediaType = req.query.mediaType;
  const language = req.query.language;
  const year = req.query.year;

  Movies.getMovies((movies) => {
    let moviesSearch;
    if (keyword) {
      //  lọc ở chế độ title or overview
      const filterMovies = movies.filter((item) => item.title);
      moviesSearch = filterMovies.filter((item) => {
        if (
          item.overview.toLowerCase().includes(keyword.toLowerCase()) ||
          item.title.toLowerCase().includes(keyword.toLowerCase())
        ) {
          return item;
        }
      });
      if (moviesSearch.length === 0) {
        res
          .status(400)
          .send({ message: "không tìm thấy bộ phim nào", check: false });
        return res.end();
      }
    } else {
      res
        .status(400)
        .send({ message: "Not found keyword params", check: false });
      return res.end();
    }

    //  lọc ở chế độ genre
    if (genre) {
      Genre.getGenreByName(genre, (genreResule) => {
        const temp = moviesSearch.filter((item) => {
          if (item.genre_ids.includes(genreResule.id)) {
            return item;
          }
        });
        moviesSearch = temp;
      });
    }
    //  lọc ở chế độ media
    if (mediaType) {
      MediaType.getMediaType(mediaType, (media) => {
        if (media === "all") {
          return;
        } else {
          const temp = moviesSearch.filter((item) => {
            if (item.media_type === media) {
              return item;
            }
          });
          moviesSearch = temp;
        }
      });
    }
    //  lọc ở chế độ language
    if (language) {
      const temp = moviesSearch.filter((item) => {
        if (item.original_language.includes(language)) {
          return item;
        }
      });
      moviesSearch = temp;
    }
    //  lọc ở chế độ year
    if (year) {
      const temp = moviesSearch.filter((item) => {
        if ("release_date" in item) {
          let [y] = item.release_date.split("-");
          if (y === year) {
            return item;
          }
        }
      });
      moviesSearch = temp;
    }

    // phân trang
    paging.paging(moviesSearch, (result) => {
      res.status(200).send({
        results: result[page],
        page: page,
        total_pages: result.length - 1,
        check: true,
      });
    });
  });
};
