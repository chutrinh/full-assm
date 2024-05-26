const express = require("express");
const router = express.Router();

const controllerTrending = require("../controllers/trending");
const controllerTopRate = require("../controllers/topRate");
const controllerDiscover = require("../controllers/discover");
const controllerVideo = require("../controllers/video");
const controllerSeach = require("../controllers/search");

router.get("/trending", controllerTrending.trending);
router.get("/top-rate", controllerTopRate.topRate);
router.get("/discover", controllerDiscover.discover);
router.get("/video", controllerVideo.video);
router.post("/search", controllerSeach.search);

module.exports = router;
