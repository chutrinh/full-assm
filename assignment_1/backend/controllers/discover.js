const Movies = require("../models/moviesList");
const Genre = require("../models/genreList");
const paging = require("../utils/paging");

exports.discover = (req, res, next) => {
  const genreId = Number(req.query.genre);
  if (!genreId) {
    res.status(400).send({ message: "Not found gerne parram", check: false });
    return res.end();
  }
  const page = Number(req.query.page);
  Movies.getMovies((movies) => {
    Genre.getGenreById(genreId, (genre) => {
      let temp = [];
      for (let i = 0; i < movies.length; i++) {
        for (let j = 0; j < movies[i].genre_ids.length; j++) {
          if (movies[i].genre_ids[j] === genre.id) {
            temp.push(movies[i]);
          }
        }
      }
      if (temp.length === 0) {
        res
          .status(400)
          .send({ message: "Not found that gerne id", check: false });
        return res.end();
      }
      // phân trang
      paging.paging(temp, (result) => {
        res.status(200).send({
          results: result[page],
          page: page,
          total_pages: result.length - 1,
          genre_name: genre.name,
          message: "get data success",
          check: true,
        });
      });
    });
  });
};
