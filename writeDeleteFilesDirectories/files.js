const fs = require('fs');

//read files
//the function will fire when complete
//its asycronous 
//data is what we read from the file
fs.readFile('./docs/blog1.txt', (err, data) =>{
    if(err){
        console.log(err);
    }
    //this data would come in as data rather than readable text (so we need to convert the buffer to a string later)
    console.log(data);
    //makes the data readable
    console.log(data.toString());
});
//because the above method is asyncronous this actually is likely to be run first
console.log('last line');