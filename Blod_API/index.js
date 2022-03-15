const express = require('express')
var db = require('./config/connect')
// create our express app
const app = express()
// middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
// route

const routes = require('./routes/index')
routes(app);
//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 