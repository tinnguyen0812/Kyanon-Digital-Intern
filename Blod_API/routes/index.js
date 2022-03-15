var express = require('express');
const router = express.Router();
const categoryRouter = require('./category')
const postRouter = require('./post')
const userRouter = require('./user')
const authentication = require('../middlewares/authentication')
const checkPermission = require('../middlewares/checkPermission')

function route(app){
    app.use('/categories',authentication,checkPermission,categoryRouter)
    app.use('/posts',authentication,checkPermission,postRouter)
    app.use('/user',userRouter)
}

module.exports = route;