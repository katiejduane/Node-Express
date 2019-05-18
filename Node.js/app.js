const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHbs = require('express-handlebars');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
    .then(user => {
        req.user = user
        next();
    })
    .catch(err => console.log(err));
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

//this is a special method that is aware of all your models and creates tables for them, 
// and if you have them, relations

Product.belongsTo(User, {
    constraints: true,
    //this means if the user is deleted, all of their products are deleted, too!
    onDelete: 'CASCADE'
}); //user createdproject

User.hasMany(Product);

sequelize
    // .sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);
        // console.log(result);
        
    })
    .then(user => {
        if(!user){
            User.create({name: 'Katie', email: 'dummyemail@max.com'})
        }
        return Promise.resolve(user);
        //returning Promise.resolve so that a .then can be chained, as 'user' is just
        //a JS object, not a promise
    })
    .then(user => {
        // console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });
