const Authentication = require("../models/userToken");

exports.authentication = (req, res, next) => {
  const token = req.query.userToken;
  Authentication.getUserToken((users) => {
    const user = users.find((item) => item.token === token);
    if (user) {
      next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  });
};
