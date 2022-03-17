const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
router.post("/regis", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
module.exports = router;
