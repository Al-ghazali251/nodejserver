const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
productRoutes = require('./controllers/ProductController');
userRoutes = require('./controllers/UserController');


mongoose.connect('mongodb://localhost:27017/node_server');

const db = mongoose.connection;

db.on('error', (err) => {
    console.log(err);
});

db.once('open', () => {
    console.log("Database Connection Established Succesfully");
});

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use('/products',
    productRoutes
);
app.use('/users',
    userRoutes
);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


// use npm init to start your node js
//install nodemon for realtime updates
// install npm install express mongoose morgan body-parser