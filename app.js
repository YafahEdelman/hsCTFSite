var express = require('express');
var logfmt = require('logfmt');
var storage = require('node-persist');
var path = require('path');
var crypto = require('crypto');

storage.initSync();

var app = express();

app.configure(function(){
  app.set('views',  __dirname +'/views');
  app.engine('html', require('ejs').renderFile);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(logfmt.requestLogger());//is this really needed?
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'NoFmfULcyI5NyWtCYnKqdf5ry2sBodHr' }));//is this a security problems to have on github
  app.use(app.router);
});

var passwordHash= "aa2689cb7a41942f74fe6bafe7c0f00aaf259df87722ec9b106402fdccee23206353fb833a5dea485a40fa870f506773ed9d1273697d4ddfe4edbf1eabd382ba";
//our default password hash

app.get('/', function(req, res) {
  res.render('index.html');
});
app.get('/done', function(req, res) {
  res.render('done.html');
});
app.post('/subscribe', function(req, res) {//make it so it only does the checking when no @ in it or something
  var shasum = crypto.createHash('sha512');
  shasum.update(req.body.email);
  if(shasum.digest('hex')===passwordHash){
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
