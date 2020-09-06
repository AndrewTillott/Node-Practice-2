const express = require('express');

const app = express();

// register view engine
// app .set allows us to configure some application settings
// now it knows that ejs is going to be used for our template
app.set('view engine', 'ejs');
//if you want to store your ejs files somewhere outside of the default 'views
//   app.set('views', 'myviews');

app.listen(3000);


app.get('/', (req, res)=>{

    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsun dolor amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsun dolor amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsun dolor amet consectetur'}
    ]

    // we previously sent the file like this 
   /*     res.sendFile('/views/index.html', {root: __dirname});  */

   // but now we are dealing with ejs we do it a bit differently 
   // any data or javascript is sent to the ejs file from the curly brackets to be used
   //title is now accessible in ejs
   // when we reference title in ejs it will return Home
   // you could shorten "blogs: blogs" to "blogs"
   res.render('index', {title: 'Home', blogs: blogs});

});

app.get('/about', (req, res)=>{

    /*res.sendFile('./views/about.html', {root: __dirname});*/
    res.render('about', {title: 'About'});
});

app.get('/blogs/create', (req, res)=>{
    res.render('create', {title: 'Create a new Blog'});
})

app.use((req, res)=>{
   // please note the additional parameter of title is completely optional it is just to pass data to the file
    res.status(404).render('404', {title: '404'});
});