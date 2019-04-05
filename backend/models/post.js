const mongoose = require('mongoose');

// create blueprint
const postSchema = mongoose.Schema({
  //title: String // sinple data type; javascript uppercase s, typescript lowercase s
  title: { type: String, required: true }, // can store a json object
  content: { type:String, required: true }
});


// turn definition into a model
module.exports = mongoose.model('Post', postSchema); // name of model, schema
// export to allow usage outside of file
