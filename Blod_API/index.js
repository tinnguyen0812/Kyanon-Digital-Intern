const express = require('express')
var db = require('./config/connect')
require('dotenv').config()
// create our express app
const app = express()
// middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
// route

const routes = require('./routes/index.route')
routes(app);
//start server
app.listen(process.env.PORT || 3000, ()=>{
    console.log(`listeniing at port:${process.env.PORT}`)
}) 