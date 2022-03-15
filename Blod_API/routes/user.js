const express = require('express');
const userController = require('../controllers/user')
const router = express.Router();
router.post('/regis',userController.register)
router.post('/login',userController.login)
module.exports = router;