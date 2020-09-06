const express = require('express');


const app = express();


app.listen(3000);


app.get('/', (req, res)=>{
    res.send('<p>home page</p>');
});

app.get('/about', (req, res)=>{
    res.send('<p>about page</p>');
});

app.get('/index', (req, res)=>{
    //by default express looks from an absolute perspective from the root of our pc
    // we need to tell it to look relatively
    /* res.sendFile('./views/index.html'); */


    // this tells it that the root is the current file
    res.sendFile('/views/index.html', {root: __dirname});

});

app.get('/about2', (req, res)=>{
    //res.send('<p>about page</p>');
    res.sendFile('./views/about.html', {root: __dirname});
});

//redirects 
app.get('/about-us',(req, res)=>{
    //auto sets the status code
    res.redirect('/about');
});

// 404 page 
// use is for middleware (to create middleware or fire middleware functions)
//this will fire for every single request coming in, but only if it reaches this part of the code
// The parser will go through each of the get requests above, and if it finds a match e.g. /about then it will fire the relevant function
// if no match is found then this will be fired 
// it should be near the end of the page because otherwise it may fire before a match is found
//remember it fires for every single request
// if it sends a request to the browser it doesnt carry on with the rest of the code
app.use((req, res)=>{
    //express doesn't know this is a 404 status so we tell it specifically
    res.status(404).res.sendFile('./views/404.html', {root: __dirname});
});