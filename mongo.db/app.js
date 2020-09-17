const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
// we have to require the blog file so that we can use the blog model and schema
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://netninja:test1234@cluster0.sgoqt.mongodb.net/node-tuts?retryWrites=true&w=majority";
// connect to mongodb & listen for requests
// the object after dbURI are just there to prevent deprecation warnings, but are not necessary
// this is asyncrynous and therefore returns something like a promise that we can then do things with
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  // we don't want the server to listen for requests until the connection has been made. BEcause for example if a user
  //requests a page that is dependent upon a load of data from the database we can't show it until the connection has been
  //established
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));


// extended: true is unneccessary but optional
// this takes all of the data that is encoded on the url and parses it into an express object that can be used 
// this allows us to accept form data e.g. from post requests
//without this line the data would be submitted as undefined
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// mongoose & mongo tests
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    // notice how the structure is the same as the schema in blog
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
  // this is used to save it to the database - specifically to the blog collection
  blog.save()
    .then(result => {
      // making it visible in the browser (you will literally see the object if you go to that url)
      res.send(result);
    })
    .catch(err => {
      // logs an error if occurred
      console.log(err);
    });
});

app.get('/all-blogs', (req, res) => {
  // finds us all of the documents in the blog collection --> then fires the result
  // notice that this is directly applied to the blog, not to an instance of the blog. 
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
  // result is what comes back from the database
    .then(result => {
      // display it to browser. Note that sending data to a browser like this looks pretty ugly (a data object)
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/', (req, res) => {
  // redirects someone who goes to the home page --> /blogs page
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.get('/blogs/:id', (req, res)=>{
  const id = req.params.id;
  Blog.findById(id)
    .then(result=>{
      res.render( 'details', {blog: result, title: 'Blog Details' })
    })
    .catch(err=>{
      console.log(err);
    })
})

// delete request provides the handler for the delete request
app.delete('/blogs/:id', (req, res)=>{
  // identifies the id from the parameter
  const id = req.params.id;

  // goes out to the database -> find the relevant document by the id and deletes it from the database
  // remember this is the Blog database Model
  Blog.findByIdAndDelete(id)
  // because it is async we have a .then
  .then(result =>{
    // saying that after the delete method has been completed we will send a response to the browser
    // it will be a json object. It then tells the browser where to redirect too
    res.json({redirect: '/blogs'})
  })
  .catch(err => {
    console.log(err);
  })
})

// blog routes
app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new blog' });
});

app.get('/blogs', (req, res) => {
  // sort method allows us to tap into the timestamps that mongoose automatically added on for us 
  // the -1 just means in descending order (from the newest to the oldest ---> newest at the top of the page)
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      // this is just rendering the index page, but also providing some data in object form that ejs can pull and display
      res.render('index', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post('/blogs', (req, res)=>{
  // middleware that will parse the data onto the request object -- > url encoded see earlier is what makes that possible

  // note that this is possible because the form submitted has the same schema structure as the blog schema
  const blog = new Blog(req.body)
  
  // save it to the database in the blog model
  blog.save()
    .then((result)=>{
      // we then send them (on submit) to the blogs page
      res.redirect('/blogs');
    })
    .catch((err)=>{
      console.log(err);
    })

})

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});