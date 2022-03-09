const express = require('express');
require('../config/passport')
const router = express.Router();
router.use('/login',require('./login'))
router.use('/',require('./CRUD_process'))

module.exports = router;