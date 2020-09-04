//Global object (very similar to the window, makes the functions we need available)
//console.log(global);

//you don't actually need to reference the global, but this is roughly how it would work
//surprisingly these functions run automatically without seeming to be called.
global.setTimeout(()=>{
    console.log('in the timeout');
    clearInterval(int); 
}, 3000);
const int = setInterval(()=>{
    console.log('in the interval');
}, 1000);

console.log(__dirname);
console.log(__filename);