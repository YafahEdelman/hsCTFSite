var express = require("express");
var logfmt = require("logfmt");
var storage = require('node-persist');
var path = require('path');
storage.initSync();
var app = express();
app.use(express.static(path.join(__dirname, 'public')));

app.configure(function(){
  app.set('views',  __dirname +'/views');//this may not work
  app.engine('html', require('ejs').renderFile);
  app.use(logfmt.requestLogger());//is this really needed?
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));//what is this??
  app.use(app.router);
});


app.get('/', function(req, res) {
  res.render('index.html');
});
app.post('/subscribe', function(req, res) {
  var emails=storage.getItem("emails");
  emails.push(req.body.email);
  storage.setItem("emails",emails);
});


var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});
