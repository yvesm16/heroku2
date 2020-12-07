var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var app = express();
app.set('port', process.env.POST || 3000);
app.set('view engine', 'ejs');
app.set('views', 'Frontend');
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(require('./js/routes/pages'));
var server = app.listen(3000, function() {
  console.log('Running server');
})


