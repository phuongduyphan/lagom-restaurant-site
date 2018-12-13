const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const passport = require('passport');

const indexRouter = require('./routes/index');
const aboutRouter = require('./routes/about');
const menuRouter = require('./routes/menu');
const reservationRouter = require('./routes/reservation');
const contactRouter = require('./routes/contact');
const adminRouter = require('./routes/admin');
const reservationAPIRouter = require('./routes/reservationAPI');
const dishAPIRouter = require('./routes/dishAPI');
const adminAPIRouter = require('./routes/adminAPI');
const manageRouter = require('./routes/manage');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// BodyParser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));

// Passport config
app.use(passport.initialize());
require('./config/passport-config')(passport);


app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/menu', menuRouter);
app.use('/reservation', reservationRouter);
app.use('/contact', contactRouter);
app.use('/manage', manageRouter);
app.use('/admin', adminRouter);
app.use('/api/reservations', reservationAPIRouter);
app.use('/api/dishes', dishAPIRouter);
app.use('/api/admins', adminAPIRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const server = app.listen(process.env.PORT || 3000, () => {
//   console.log(`Node.js listening on ${process.env.PORT || 3000} ...`);
// });

module.exports = app;
