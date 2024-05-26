const express = require("express");
const router = express.Router();

// user xác thực
const authController = require("../controller/auth");
router.get("/", authController.getLogin);
router.post("/register", authController.posRegister);
router.post("/login", authController.postogin);

// admin xát thực
router.post("/admin", authController.postLoginAdmin);

module.exports = router;
