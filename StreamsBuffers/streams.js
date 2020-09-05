const fs =require('fs');

//this allows us to read from the file by creating the stream
const readStream = fs.createReadStream('./docs/blog1.txt');

//event listener, every time we receive a chunk of data we fire the call back function and get access to the data
readStream.on('data', (chunk) => {
    //this was just to demonstrate when he ran the console that you got the data in chunks
   console.log('----- NEW CHUNK ------');
    console.log(chunk.toString());
   
})

//Instead of using the toString method you could specify the encoding earlier
const readStreamWithEncodingNotToString = fs.createReadStream('./docs/blog3.txt', {encoding: 'utf8'});

readStream.on('data', (chunk)=>{
    console.log(chunk);
})