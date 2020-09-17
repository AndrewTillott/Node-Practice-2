//used to create a server
const http = require('http');

//used to create a server
//takes a call back function
//the req object comes full of information related to the request
// e.g. the url, is it a get request or post? etc
//res is what we use to send information to the user through the browser
/*   http.createServer((req, res)=>{
    //example
    console.log('request made');
}); */

//you can store it as a constant in case you want to use it in the future for something like web sockets
const server = http.createServer((req, res)=>{
    //interestingly the code isn't running in the browser, it is running in the server
    //therefore this console.log is visible in the terminal not the browsers console
    console.log('request made');
    // the req object is a huge object like the global or the window (but specific to the request). this prints it out in the terminal
    // it contains headers (meta data about the request)
    // it contains the type of request 
    // it contains the expected response types 
    // it contains the url that the user has visited 
    console.log(req);
    //what is the url of the request 
    //what is the method e.g. post request? get request?
    console.log(req.url, req.method);

    //if there is no res then the browser hangs around doing nothing
    // the first part of a response is to formulate the response headers
    // response headers give the browser a bit more information about what is coming back to it
    // includes what kind of data is coming back, is it text? json etc?
    // we can also do stuff like set header cookies

    // Three steps to sending a response

    // set header content type 
    // there are different types of header - but this one sets the content type to plain text
    res.setHeader('Content-Type', 'text/plain');

    // write what content we want to send back to the browser 
    res.write('hello, ninjas');
    // then we end the response which sends it to the browser
    res.end();

});

//listen for requests
//need to pass in a port number
//second arg is the port name
//you don't need to specify local host it is default
server.listen(3000, 'localhost', ()=>{
    console.log('listening for requests on port 3000');
})


//send html instead of a string 

/*

res.setHeader('Content-Type', 'text/html');

res.write('<head><link rel="stylesheet" href="#"><head>')
res.write('<p>hello, ninjas</p>');
res.write('<p>hello again, ninjas</p>');
res.end();

*/