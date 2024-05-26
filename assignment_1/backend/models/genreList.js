const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "datas",
  "genreList.json"
);

module.exports = class Genre {
  static getGenreById = (genreId, cb) => {
    fs.readFile(p, (err, fileContnet) => {
      if (err) {
        cb([]);
      } else {
        const genres = JSON.parse(fileContnet);
        const genre = genres.find((item) => item.id === genreId);
        cb(genre);
      }
    });
  };

  static getGenreByName = (genreName, cb) => {
    const genres = fs.readFileSync(p, "utf8");
    if (genres) {
      const jsonGenres = JSON.parse(genres);
      const genre = jsonGenres.find(
        (item) => item.name.toLowerCase() === genreName.toLowerCase()
      );
      if (genre) {
        cb(genre);
      } else {
        cb([]);
      }
    } else {
      cb([]);
    }
  };
};
