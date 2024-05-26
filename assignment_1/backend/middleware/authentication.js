const express = require("express");
const router = express.Router();

const controllerAuthentication = require("../controllers/authentication");

router.use(controllerAuthentication.authentication);

module.exports = router;
