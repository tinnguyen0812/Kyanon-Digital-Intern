var express = require('express');
const router = express.Router();
const categoryRouter = require('./category')
const postRouter = require('./post')
const userRouter = require('./user')

function route(app){
    app.use('/categories',categoryRouter)
    app.use('/posts',postRouter)
    app.use('/user',userRouter)
}

module.exports = route;