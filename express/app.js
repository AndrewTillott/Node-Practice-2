const express = require('express');

//express app 
const app = express();

//listend for requests 
app.listen(3000);

//listen for get requests 
app.get('/', (req, res)=>{
    //old method with write and end 
    res.write('');
    res.end();

    //new method (automatically infers the type of content that we are trying to send) 
    //no longer a need to do: res.setHeader('Content-Type', 'text/html');
    //it also infers the status code, so we don't need to manually set that 
    // please note there are some scenarios where we would want to manually set it
    res.send('<p>home page</p>');
})


//redirects 
app.get('/about-us',(req, res)=>{
    res.redirect('/about');
})