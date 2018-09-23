const express      = require('express');
const cookieParser = require('cookie-parser');
const logger       = require('morgan');

const battleAPIRoutes = require('./routes/battle');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());


app.use('/battle', battleAPIRoutes);

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({
    error: "something_went_wrong"
  });
});

module.exports = app;