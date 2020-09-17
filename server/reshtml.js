const http = require('http');
const fs = require('fs');
const { defaultCipherList } = require('constants');


const server = http.createServer((req, res)=>{
   
    // set header content type
    res.setHeader('Content-Type', 'text/html');

    // to perform routing we will first want to know what page the user is requesting
    // we will use views to allow us to enter the folder where the html filess are
    let path = './views';
    // We can use a switch statement to figure out which page is being requested
    // req.url allows us to find the url that the request has come from
    switch(req.url){
       //if the req.url is coming from the home page
        case '/': path += 'index.html';
        // we have set the status code here so that it can be tailored to the response
        res.statusCode = 200;
        break;
        //we are matching hte req.url against the possibilities we have available so we know what to respond with
        //notice how the path is manipulated and appended. We can then use this path variable later
        case '/about': path += 'about.html';
        res.statusCode = 200;
        break;
        //this is a redirect e.g. if you changed what the url was for a page, this allows the old link to redirect to the correct new link
        case '/about-me': res.setHeader('Location', '/about')
        // this is the status code we use to tell the browser that the page was moved
        //these redirects may be important if you had thousands of people linking to a page, but then you changed the link of the page (you would want them to still access it somehow!)
        res.statusCode = 301;
        res.end();
        break;
        // if they have requested a file that we don't have then we throw the error page
        default: path += '404.html';
        res.statusCode = 404;
        break;
    }

    //send the html file that has been requested through the path 
    fs.readFile(path, (err, data)=>{
        if(err){
            console.log(err);
            res.end();
        }
        else {
            //add a status code 
            // if we put it here it would send a 200 status code no matter what (e.g. if the switch statement was 404)
            //therefore we don't want to put it here
            /*         res.statusCode = 200;         */

            res.write(data);
            res.end(data);
        }
    })



    //send a generic html file 
    fs.readFile('./views/index.html', (err, data)=>{
        if(err){
            console.log(err);
            // if there is an error you should still res.end
            // otherwise request will be kept hanging 
            res.end();
        }
        else {
            //write it to the browser
            res.write(data);
            // if you are only sending one thing in res.write you can just pass the data straight into the end method and skip the step above
            //otherwise you can have multiple res.write(data) lines
            res.end();
        }
    })
    
})

server.listen(3000, 'localhost', () =>{
    console.log('listening for requests on port 3000');
})