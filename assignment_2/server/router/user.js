const express = require("express");
const router = express.Router();
const User = require("../model/user");

const userController = require("../controller/user");

router.use(async (req, res, next) => {
  const token = req.body.token;
  const user = await User.find({ token: token });
  if (user.length > 0) {
    req.user = user[0];
    next();
  } else {
    res.json({ message: null });
  }
});

router.post("/addReserve", userController.postAddReserve);
router.post("/transaction", userController.getTransactions);
router.post("/transaction-detail", userController.getTransactionsDetail);
module.exports = router;
