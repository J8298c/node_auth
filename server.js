const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const configDB = require('./config/database');

require('./config/passport')(passport);
mongoose.connect(configDB.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.use(session({secret: 'littledebbiesareyummy',
                 resave: false,
                 saveUninitialized: true,
                 cookie: { secure: true }
                }));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

 require('./app/routes.js')(app, passport);

app.listen(port, ()=>{
    console.log(`app is now listening on port ${port}`);
});
