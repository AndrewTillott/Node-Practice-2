// ./ means look in the same file
//this whole file is run (including the console.log despite the fact that nothing was exported etc)
const xyz = require('./people')
//returns an empty object because nothing is exported or logged in xyz
//console.log(xyz);
//also we are unable to run the people array because again it is not exported (this will cause an error)
console.log(xyz.person);
console.log(xyz.ages);

//now because something is exported from people xyz is exported

//we have destructured the people page, you can now access people directly (without even referenceing xyz.people)
// if you just required this way you would not be able to access the ages
const { people } = require('./people');

// you could also get multiple things like this: 
//use it if you only need one or two things from a different file
const {people, ages} = require('./people');


//os stands for operating system
//it is a core module
//imported into this file 
//this is an object about the current operating system
const os = require('os');

//this logs their os e.g. win32 for windows 32. the home dir represents where the home directory of the user
console.log(os.platform(), os.homedir());
// there are several core modules on node.js os is one of them, a file system is another
