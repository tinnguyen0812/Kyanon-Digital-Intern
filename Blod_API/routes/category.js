const express = require('express');
const categoryController = require('../controllers/category')
const router = express.Router();
router.get('/',categoryController.List)
router.post('/',categoryController.Create)
router.put('/:id',categoryController.Update)
router.get('/:id',categoryController.Detail)
router.delete('/:id',categoryController.Delete)
module.exports = router;