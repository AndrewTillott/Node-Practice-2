# Node-Practice-2
Refamiliarising myself with Node through a tutorial. 

The code for this is not designed to be optimised or efficient (it is essentially just my notes from following the tutorial).

I found watching his previous node tutorial to be really interesting and useful despite working with node previously: so I decided to go through his second one too.

This is following net ninja: https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU


-What is node.js?

We typically think of code as front end and back end. 

The front end is typically what happens in the browser. 

Node allows us to use code on the server.

-Code

We have machine code which computers can understand. 

This is converted to assembly language. 

This can then be converted to C++ 

Javascript can be run in the browser thanks to the v8 engine (which compiles javascript into machine code)

-Node Allows

: read and write files on a computer 
: connect to a database 
: act as a server for content

- Streams

Start using data, before it has finished loading 

Rather than dumping all of the data in one go

Deliver the water in a stream (bit by bit, it fills a buffer and then sent across to the browser)

- IP addresses 

Like addresses for computers.

All computers have a unique ip address.

Some special pc's are known as hosts.

To connect to a specific server e.g. that will host our website we need to know its ip address

When we type in a domain name, the computer knows to look for the ip address associated with that domain, and then the browser will look for the relevant computer associated with it

- Get Request

When we type something into a browser and then get a result, that is a get request 

Its made every time we go to a different web page (either because of a link, or directly typing into the address bar)

Communication occurs through HTTP (allowing communication between the browser and the host)


- Creating a server 

We can use node to create a server and listen to requests coming from the browser



- Post Request 

Generally used to send data to a server e.g. from a web form 

- Local Host 
 
Local host is like a domain name on the web 

127.0.0.1  - which would take you back to your own computer. Your own computer is then acting as the host for the website 

- Port Numbers

Like doors into a computer through which internet communications can be made to different programs.
As long as it doesnt clash with a port number of another programme it is fine to use 
e.g. localhost:3000 


- Status Codes 

Describes the type of response sent to the browser and how successful the response was 

200 - ok 
301 - resource moved pernamently 
404 - not found 
500 - internal server error

There are more status codes too, but here is generally how they work:

100 range - informational responses 
200 range - success codes 
300 range - codes for redirects 
400 range - use or client error codes 
500 range - server error codes

- EJS Templates

Our view files live on the server 

When we want to view one it is passed into the ejs view engine to be processed 

The view engine looks for any dynamic content, variables, loops etc -> finds the valid html codes and returns to the browser the valid html 

This whole process is called serverside rendering 

- Middleware 

Code which runs (on the server) between getting a request and sending a response

Any code that technically runs between the request and the response is technically middleware. 

The (app.use()) use method is generally used to run middleware code. We can have multiple middleware functions 

app.get('') is also technically middleware because it is code that runs after the request comes in, but before the response goes out 

The difference between app.get() and app.use() is that app.get() runs for every get request, but only get requests. Wheras app.use() runs for every request that is made.

Middle ware runs from top to bottom.

Once a function sends a response we stop going down the chain of middleware.

IMPORTANT... when you get to a middleware function that sends a response you stop going down the chain of middleware. IS THIS WHAT THE NEXT METHOD IS FOR?

The order of middleware is therefore important to how it runs. 

- Other ways to use Middleware

- We could use logger middleware to log the details of every request
- Authentication check middleware for protected routes 
- Middleware to parse JSON data from requests
- Return 404 pages 


- SQL vs NoSQL

SQL use: tables, rows and columns 

NoSQL use: collections, Documents, example: mongoDB


- How does a noSQL database work?

You split it into collections 

For example a "User Collection" is for a particular type of data. E.g. a user collection is for user documents.

For example: you might have a "Blog Collection" to store blog documents. 

A document includes a series of key value pairs 

- Mongoose 

Is an ODM library (Object Document Mapping Library)

This basically means that it wraps the MongoDB Api and provides a much easier method of connecting to and interacting with the database. 

It does this by allowing us to make simple data models that allow us to create, get and update models and replace documents. e.g. User.get(), User.findById(). Blog.deleteOne()

You don't have to use Mongoose. You can use the standard MongoDB library if you prefer but sometimes it feels a bit more clunky and verbose. 

- Schemas and Models 

These are used across MongoDB and Mongoose

In Mongoose we create a Schema first. The schema defines the structure of the data type / document (properties and property types)

EXAMPLE SCHEMA 

O User Schema 

- name (string), required
- age (number)
- bio (string), required

BLOG SCHEMA 

- title (string), required
- snippet (string), required
- body (string), required


- Schema Model


The next thing we have to do is create a model based on that schema

O Models are the thing that allow us to communicate with database collections

If we had a Blog Model ---> it is the blog model that has methods to save, update delete data etc

- Get Post Delete Requests

Get requests are to get a resource 

Post requests are to create new data (e.g. a new blog)

Delete requests to delete data (e.g. delete a blog)

PUT requests to update data (e.g. update a blog)



