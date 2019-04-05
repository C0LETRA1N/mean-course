// express.js app
const express = require('express');
const bodyParser = require("body-parser"); // for express to help parse post body data
const mongoose = require('mongoose');
const cors = require('cors');

const postsRoutes = require('./routes/posts');

const app = express(); // returns an express app

//app.use((req, res, next) => { // middleware
//  console.log('First middleware');
//  next(); // continue on...
  // call next if you are not sending data back
//});

mongoose.connect("mongodb+srv://christopher:gOleJqhk9AIIxayA@cluster0-wzmda.mongodb.net/node-angular?retryWrites=true") // will create if doesnt exist
.then(() => { // connect returns a promise for output or logic or catch errors
  console.log('Connected to database!');
})
.catch(() => {
  console.log('Connection failed!');
});

app.use(bodyParser.json()); // parsing json
app.use(bodyParser.urlencoded({ extended: false }));

 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin','*'); // allows request from any domain to access the api
  res.setHeader('Accsss-Control-Allow-Methods', 'GET, PUT, POST,  DELETE, PATCH, OPTIONS'); // add options for implicit options to check if post is valid
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // allow other headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

//added to handle delete because setHeader was not working; need to review configuration
app.use(cors());

// separate routes into different files
app.use('/api/posts', postsRoutes);

module.exports = app; // exports
