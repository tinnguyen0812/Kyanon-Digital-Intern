const express = require("express");
const userController = require("../controllers/user.controller");
const router = express.Router();
router.post("/regis", userController.register);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.put("/add", userController.addPermision);
router.delete("/dell", userController.delPermision);
module.exports = router;
