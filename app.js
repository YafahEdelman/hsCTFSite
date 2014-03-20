var express = require('express');
var logfmt = require('logfmt');
var storage = require('node-persist');
var path = require('path');

storage.initSync();

var app = express();

app.configure(function(){
  app.set('views',  __dirname +'/views');//this may not work
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(logfmt.requestLogger());//is this really needed?
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'NoFmfULcyI5NyWtCYnKqdf5ry2sBodHr' }));//is this a security problems to have on github
  app.use(app.router);
});


app.get('/', function(req, res) {
  res.render('index.html');
});
app.get('/done', function(req, res) {
  res.render('done.html');
});
app.post('/subscribe', function(req, res) {
  if(req.body.email==="somepasswordhere"){
    res.send(storage.getItem('emails'));
  }else{
  var emails=storage.getItem('emails');
  emails.push(req.body.email);
  storage.setItem('emails',emails);
  res.redirect('/done');}
});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log('Listening on ' + port);
});
