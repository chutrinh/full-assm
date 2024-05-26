const express = require("express");
const router = express.Router();
const User = require("../model/user");

const adminController = require("../controller/admin");

// home
router.get("/dashboard", adminController.getDashboard);
router.get("/transaction-all", adminController.gettransactionAll);
router.get("/hotels", adminController.getHotels);
router.get("/rooms", adminController.getRooms);
router.get("/infor-board", adminController.getInfor);

router.use(async (req, res, next) => {
  const admin = await User.findOne({ token: req.body.token });
  if (admin) {
    next();
  } else {
    res.json({ message: "admin chưa đăng nhập" });
  }
});

router.post("/add-hotel", adminController.postAddHotel);
router.post("/add-room", adminController.postAddRoom);
router.post("/delet-hotel", adminController.postDeletHotel);
router.post("/delet-room", adminController.postDeletRooml);
router.post("/get-edit-hotel/:idHotel", adminController.getEditHotel);
router.post("/post-edit-hotel/:idHotel", adminController.postEditHotel);
router.post("/get-edit-room/:idRoom", adminController.getEditRoom);
router.post("/post-edit-room/:idRoom", adminController.postEditRoom);

module.exports = router;
