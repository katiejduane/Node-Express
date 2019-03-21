// NODE JS is the language
// Express IS node; a node module

// Native modules:
const path = require('path');

// FIRST-->
// npm init HELPS YOU MAKE the package.json

// Non-native modules:
// Express is a 3rd party module, so it must be INSTALLED before it can be 'required'
// npm install express --save (and other variations on this) is how you do it

// getting express on board:
const express = require('express'); 

// invoke the express function, called "createApplication", which lives in 'express.js', 
// in the 'lib' folder in the express/node modules!
const app = express();

// serve up static files-->
app.use(express.static('public'));

// app.all() is a method, and it takes two arguments:
// 1. route
// 2. callback to run if the route is requested
app.all('/', (req, res) => {
    // express handles the basic headers (status ,mime-type)
    // res.send(`<h1>This is the homepage!</h1>`)
    // the above method is ineffectual for sending real stuff, one way to send more stuff:
    // read in Node.html
    res.sendFile(path.join(__dirname + '/node.html'))
    // express handles the 'end'
});

app.all('*', (req, res) => {
    res.send(`<h1>sorry this page does not exist!</h1>`)
})

app.listen(3000)

