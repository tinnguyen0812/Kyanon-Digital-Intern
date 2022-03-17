const express = require('express');
const postController = require('../controllers/post.controller')
const router = express.Router();
router.get('/',postController.List)
router.post('/',postController.Create)
router.put('/:id',postController.Update)
router.get('/:id',postController.Detail)
router.delete('/:id',postController.Delete)
module.exports = router;