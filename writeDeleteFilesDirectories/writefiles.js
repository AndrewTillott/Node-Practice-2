const fs = require('fs');

//the first two arguments replace whatever is in blog with the text hello world 
//the third arg is a callback function
//this function is also async so the function is not fired until after the first two args dealt with
fs.writeFile('./docs/blog1.txt', 'hello, world', ()=>{
    console.log('file was written');
});

//if you write a file that doesn't already exist then it creates one
fs.writeFile('./docs/blog2.txt', 'hello again', ()=>{
    console.log('file was written');
})

//make directory
//we are specifying where and what to call it in the parentheses
// ./ means current folder 
fs.mkdir('./assets', (err)=>{
    if(err){
        console.log(err);
    }
    console.log('folder created');
});

//because mkdir will create an error if the folder already exists it may be worth using an if statement
//syncrynous method so it will block the code
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created');
    })
} else {
    fs.rmdir('./assets', ()=>{
        if(err){
            console.log(err);
        }
        console.log('folder deleted');
    });
}
