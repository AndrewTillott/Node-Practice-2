// PLEASE NOTE THERE IS A LOT OF EJS SYNTAX HERE (But no views files set up)

const express = require('express');
//requiring third party middleware (installed with npm)
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');

app.listen(3000);
// this is third party middleware being used - its for logging data to console
// each thing that is logged gives specific data about the request e.g. request time?
app.use(morgan('dev'));

// middleware to run static files
// please note that the browser blocks the user from seeing files unless they have been made available specifically
//simply enter the name of the folder in the part that says public to have it released to the front end 
// now for example if you linked to a css file in the head of a file (to the public folder) you could access it
// it would already know to look in the public folder 
app.use(express.static('public'));

// next method gets passed in here
app.use((req, res, next)=>{
    console.log('new request was made:');
    console.log('host:', req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    // fired here
    // it is necessary because node doesn't know how to run multiple pieces of middleware
    // you fire this to move to the next piece
    next();
});
app.use((req, res, next)=>{
    console.log('we got to the second set of middleware');
    next();
});

app.get('/', (req, res)=>{
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum'},
        {title: 'how to defeat bowser', snippet: 'Lorem ipsum'},
    ];
    res.render('index', {title: 'Home', blogs});
});

app.get('/about', (req, res)=>{
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req,res)=>{
    res.render('create', {title: 'Create a new Blog'});
})
// this middleware will only fire if the above hasn't been fired 
app.use((req, res)=>{
    res.status(404).render('404', {title: '404'});
})