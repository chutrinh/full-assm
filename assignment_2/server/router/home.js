const express = require("express");
const router = express.Router();

const homeController = require("../controller/home");

router.get("/", homeController.getHotels);
router.post("/search", homeController.postSearch);
router.get("/hotels/:hotelId", homeController.getDetailHotel);

module.exports = router;
