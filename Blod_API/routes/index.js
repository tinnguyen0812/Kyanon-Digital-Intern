var express = require('express');
const router = express.Router();
const categoryRouter = require('./category.route')
const postRouter = require('./post.route')
const userRouter = require('./user.route')
const {checkPermission,checkToken}=require('../authentication/authorize')

function route(app){
    app.use('/category',checkToken,checkPermission,categoryRouter)
    app.use('/post',checkToken,checkPermission,postRouter)
    app.use('/user',userRouter)
}

module.exports = route;