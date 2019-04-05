const express = require('express');

const Post = require('../models/post') // start with capital letter for object based on mongo schema model

const router = express.Router();

// specific use of post and get
router.post("",(req, res, next) => {
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

// put will delete and replace; patch will update
router.patch("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.body.id,
    title:req.body.title,
    content:req.body.content
  });
  Post.updateOne( {_id: req.params.id }, post).then(result => {
      console.log(result);
      res.status(200).json({message: "Update successful"});
  }); // mongod function; requires _id
});

router.get('',(req, res, next) => { // function must be last argument
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

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: 'Post not found'});
    }
  });
});

router.delete("/:id", (req, res, next) => {
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: "Post deleted!" });
  });

}); // add segment to identify

module.exports = router;
