const express = require('express');
const app = express();
const path = require('path')
const helmet = require('helmet')

// serve up static files
app.use(express.static('public'));
// parse JSON and urlencoded data into req.body
app.use(express.json());
app.use(express.urlencoded());
app.use(helmet())

// app.set() takes 2 args:
// --a key(name) and a value
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// 1. Express/Node as we know it happen, this file
// 2. We define a view engine (EJS, Mustache, Handlebars, Jade/Pug)
// 3. Inside one of our routes, we have a res.render
// 4. We pass the res.render 2 things:
//      --the file we want to use
//      --the date we want to send to that file
// 5. Express uses the node module for our specified view engine an parses the file.
//    That means, it takes the HTML/CSS/JS and combines it with whatever "node" there is in the file.
// 6. The final result of this process is a compiled product of the things the browser can understand:
//      --HTML, CSS, JS


app.get('/',(req, res, next) => {
    res.render("index")
})

app.listen(3000)