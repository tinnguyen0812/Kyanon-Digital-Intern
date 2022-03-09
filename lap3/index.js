const express = require("express")

const fs = require('fs');
const passport = require('passport')
const session = require('express-session');
// create our express app
const app = express()
// middleware
app.use(express.urlencoded({ extended: false}))
app.use(express.json());
app.use(passport.initialize());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
// route
const routes = require('./routes/index')
app.use('/', routes);
//start server
app.listen(3000, ()=>{
    console.log("listeniing at port:3000")
}) 