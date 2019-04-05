// express.js app
const express = require('express');
const bodyParser = require("body-parser"); // for express to help parse post body data
const mongoose = require('mongoose');
const cors = require('cors');

const Post = require('./models/post') // start with capital letter for object based on mongo schema model

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

// specific use of post and get
app.post("/api/posts",(req, res, next) => {
  //const post = req.body;
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({ // everything okay and new resource added
      message: 'Post added successfully',
      postId: createdPost._id
    }); // inside then blcok os it updates the id field
  }); // mongoose save function
  //console.log(post);

}); // do not call next

app.get('/api/posts',(req, res, next) => { // function must be last argument
  //res.send('Hello from express!');
  Post.find() // return all entries; can be narrowed down
    .then(documents => {
      // return must be in then block; asynchronous
      res.status(200).json({
        message: 'Posts fetched successfully',
        //posts: posts // can send just posts as an argument or this more complext object
        posts: documents
      });
    });

});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });

}); // add segment to identify

module.exports = app; // exports
