const express = require('express');
const app = express();

// app comes with a USE method: .use()
// app is used, essentially, to mount middleware
// use takes 1 arg (right now, more later) --> the middleware you want to run!
// anything in the 'public' folder, as declared below, will be available to the user (and therefore visible!)
app.use(express.static('public'))
// you can have as many of the above declarations as you want, for whatever folder/files



app.listen(3000)
console.log('Server listening on port 3000')