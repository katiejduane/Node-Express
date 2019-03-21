const path = require('path')

const express = require('express');
const app = express();

const cookieParser = require('cookie-parser')

const helmet = require('helmet');
app.use(helmet());

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// a bit of middleware to handle the "msg" for login success/failure on all routes
app.use((req,res, next) => {
    if(req.query.msg == 'fail'){
        // the view engine has access to res.locals (so does all other middleware)
        res.locals.msg = 'Sorry, this username/password does not exist...'
    } else {
        res.locals.msg = '';
    }
    next()
})

app.get('/', (req, res, next) => {
    res.send("sanity check")
});

app.get('/login', (req, res, next) => {
    // the req object has a query property in Express
    // req.query is an object, with a property of every key in the query string
    // the query string is where you put INSECURE data
    // console.log(req.query)
    // can also set up logic here for login auth, but for this site
    // we did it in the anon middleware written on line 20)
    res.render('login')
});

app.post('/process_login', (req, res,next) => {
    const password = req.body.password;
    const username = req.body.username;
    // if they're valid, we'll send them to the welcome page,
    // but first we'll save their username in a cookie 
    // (sessions are also possible, and safer, but for this 
    // course we'll use a cookie)
    if(password == "x") {
        // res.cookie takes two args, the name of the cookie and the value to set it to
        res.cookie('username', username)
        // res.redirect takes one arg: where to send the broswer
        res.redirect('/welcome')
    }else{
        // The '?' is a special character in a URL; 'everything after
        // me is part of a query string' (it's not a part of the path to a page)
        // the '?' is followed by 'key value pairs' example from below--> msg: fail, test: hello
        res.redirect('/login?msg=fail&test=hello')
    }
})

app.get('/welcome', (req, res, next) => {
    res.render('welcome', {
        // req.cookies object will have a property for every named cookie
        username: req.cookies.username
    })
})

// app.param() takes two args:
// 1. param to look for in the route 
// 2. the callback to run with the usuals
// the usuals get another arg, the thing we're looking for in the params!
app.param('storyId', (req, res, next, id) => {
    console.log("params called:", id);
    // if the id (or whatever) has something to do with stories, we can do stuff...
    // if the id has something to do with blogs, we can do stuff
    // without having to run separate routes that might collide for both using the same wildcard syntax
    next();
})

// in a route, anytime something has a : in front, it has a wildcard
// a wildcard will match anything in that slot
app.get('/story/:storyId', (req, res, next) => {
    // the req.params object always exists
    // it will have a property for each wildcard in the route (eg: req.params.storyId)
    res.send(`<h1>Story ${req.params.storyId}</h1>`)

})

app.get('/story/:storyId/:link', (req, res, next) => {
    // the req.params object always exists
    // it will have a property for each wildcard in the route (eg: req.params.storyId)
    res.send(`<h1>Story ${req.params.storyId} - ${req.params.link}</h1>`)

})

// this page ONLY renders if ANOTHER wildcard shows up after 'storyId' (such as a linked article/page from story:)
app.get('/logout', (req, res, next) => {
    // res.clearCookie takes 1 are: the cookie to clear, by name!
    res.clearCookie('username');
    res.redirect('/login')
})

app.listen(3333);
console.log('Server is listening on port 3333')