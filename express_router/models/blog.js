const mongoose = require('mongoose');
//schema defines the structure of the documents that we will later store things in
// Schema is a constructor function that we will use to create a new Schema 
const Schema = mongoose.Schema;

// new instance of a schema object
const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
  //we can add an object to the end of our schema 
  // this creates timestamp properties (created at, updated at property)
}, { timestamps: true });


// first argument is the name of the model
// now we can use this name Blog - it will look for this section whenever we need to communicate with that part of the database.  
// in the speech marks it looks for the 'Blog' in the collection. 
// the schema that the model is based on is the second argument 
const Blog = mongoose.model('Blog', blogSchema);
// exporting the Blog model 
module.exports = Blog;