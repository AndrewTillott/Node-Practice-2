const fs =require('fs');

//this allows us to read from the file by creating the stream
//it seems that this method not only creates teh stream, but will also start data flowing to the relevant file as soon as the stream is created 
const readStream = fs.createReadStream('./docs/blog1.txt');

//allows us to utilse a write stream 
const writeStream = fs.createWriteStream('./docs/blog4.txt');

//event listener, every time we receive a chunk of data we fire the call back function and get access to the data
readStream.on('data', (chunk) => {
    //this was just to demonstrate when he ran the console that you got the data in chunks
   console.log('----- NEW CHUNK ------');
    console.log(chunk.toString());

    //every time we get a new chunk of data from the read stream we are going to take that data 
    //and write the string specified below
    // and then write the chunk itself to blog4
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
   
})

//Instead of using the toString method you could specify the encoding earlier
const readStreamWithEncodingNotToString = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});

readStream.on('data', (chunk)=>{
    console.log(chunk);
})


//Piping 
//this does the same thing
//takes all of the data that is coming in from the read stream 
//sends it into the Write Stream
readStream.pipe(writeStream);