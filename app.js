const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const donorRoutes = require('./routes/donorRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const cors = require("cors");
const bodyParser = require("body-parser");


// express app
const app = express();

// connect to mongodb & listen for requests
const dbURI = "";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));


//cors setup
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('*', checkUser);

app.get('/', (req, res) => {
  res.render('home', { title: 'About' });
});

//Authentication routes
app.use(authRoutes);
  
// Application routes
app.use('/donors',requireAuth, donorRoutes);


// 404 page
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});
