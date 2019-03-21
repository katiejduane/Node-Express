const express = require('express');
const app = express();

//HELMET is a 3rd party npm module that helps protect against common vulnerabilities.
const helmet = require('helmet');

app.use(helmet());

// 1. static
// 2. json
// 3. urlencoded
app.use(express.static('public'));

app.use(express.json());
// the code below PARSES the body for us
app.use(express.urlencoded({extended:false}));

app.post('/ajax', (req, res) =>{
    // console.log(req.headers);
    // I'M STILL A LITTLE CONFUSED ABOUT THE HEADERS...
    // if we're responding with JSON (which we are here), 
    // we MUST use res.json, NOT res.send
    res.json("Test")
});

app.listen(3000);