const express = require('express');
const blogController = require('../controllers/blogController');

// we have to require the blog file so that we can use the blog model and schema
const Blog = require('./models/blog');

//create a new express router (a new instance of a router object)
const router = express.Router();

// instead of app.get we use router.get
router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

// export the router
module.exports = router;


