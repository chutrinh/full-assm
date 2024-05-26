const fs = require("fs");
const path = require("path");
const p = path.join(
  path.dirname(process.mainModule.filename),
  "datas",
  "videoList.json"
);

// lấy thời gian gần nhất
const closetTime = (arrTime) => {
  const now = new Date();
  const times = arrTime.map((item) => {
    return new Date(item.published_at);
  });
  let closestTime = times[0];
  let closestDiff = Math.abs(now - times[0]);
  for (const time of times) {
    const diff = Math.abs(now - time);
    if (diff < closestDiff) {
      closestTime = time;
      closestDiff = diff;
    }
  }
  return closestTime;
};

module.exports = class Video {
  static getMovie = (filmId, cb) => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      } else {
        const movies = JSON.parse(fileContent);
        const videos = movies.find((item) => item.id === filmId);
        if (videos) {
          const trailers = videos.videos.filter((item) => {
            return item.official && item.site === "YouTube";
          });
          let filterTrailers = trailers.filter(
            (item) => item.type === "Trailer"
          );
          if (!filterTrailers) {
            filterTrailers = trailers.filter((item) => item.type === "Teaser");
          }
          const time = closetTime(filterTrailers);
          const trailer = filterTrailers.find(
            (item) => (item.published_at = time)
          );
          cb(trailer);
        } else {
          cb(null);
        }
      }
    });
  };
};
