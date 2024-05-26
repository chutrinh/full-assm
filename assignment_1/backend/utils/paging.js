exports.paging = (movies, cb) => {
  let result = [[]];
  let temp = [];
  for (let i = 0; i < movies.length; i++) {
    temp.push(movies[i]);
    if (temp.length === 20) {
      result.push(temp);
      temp = [];
    }
  }

  if (temp.length !== 0) {
    result.push(temp);
  }
  cb(result);
};
