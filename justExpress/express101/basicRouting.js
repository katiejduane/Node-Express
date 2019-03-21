const express = require('express'); 
const app = express();

app.listen(3000)
console.log("The server is listening on port 3000")

// APP object has MANY METHODS!
// HTTP verbs! REST verbs!
// CRUD app correspondance
// 1. get -READ (get is default for all browsers)
// 2. post -CREATE
// 3. delete -DELETE
// 4. put -UPDATE
// 5. all -means 'I will accept any method'

// These al ltake two args:
// 1. path
// 2. callback to run if an HTTP request that matches 
// THIS verb is made to the path in #1

// .all() responds to ALL KINDS of HTTP traffic (get, post, etc)
// app.all('/', (req, res) => {
// })

app.get('/', (req, res) => {
    console.log(req)
    res.send(`<h1>Welcome to the home GET page`)
})
app.post('/', (req, res) => {
    res.send(`<h1>Welcome to the home POST page`)
    // you can test different types of requests, like post, on "getpostman.com"
})
app.delete('/', (req, res) => {

})
app.put('/', (req, res) => {

})