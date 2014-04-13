var express = require('express');
var logfmt = require('logfmt');
var path = require('path');
var crypto = require('crypto');
var redis = require('redis');
var url = require('url');

var redisURL = url.parse(process.env.REDISCLOUD_URL);
var storage = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
storage.auth(redisURL.auth.split(":")[1]);
var emails=[]
storage.get('exists', function (err, reply) {
    //this will happen first time, the rest it will be the dict
    if(reply=="yesS"){
      storage.get('emails', function (err, reply) {
		emails=reply.split(",");
	   console.log(typeof emails);
           console.log("hhhhhhhhhhhhhi");
	});
    }else{
	storage.set('emails',[]);
	storage.set('exists','yes');
	}
});

console.log(emails.toString());
console.log("HI");

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

var passwordHash= "aa2689cb7a41942f74fe6bafe7c0f00aaf259df87722ec9b106402fdccee23206353fb833a5dea485a40fa870f506773ed9d1273697d4ddfe4edbf1eabd382ba";
//our default password hash

app.get('/', function(req, res) {
  res.render('index.html');
});

function emailUpdater(){
      emails=emails.filter(function(elem, pos) {
    return emails.indexOf(elem) == pos;
});
      storage.get('emails', function (err, reply) {
		emails=emails.concat(reply.split(","));
		storage.set('emails',emails);
		setTimeout(emailUpdater,1000); 
	});
}
emailUpdater();//1000 millisecond updating, okay?

app.post('/subscribe', function(req, res) {//make it so it only does the checking when no @ in it or something
  var shasum = crypto.createHash('sha512');
  shasum.update(req.body.email);
  if(shasum.digest('hex')===passwordHash){
    res.send(emails);//will only work if on one dynamo
 
  }else{
  emails.push(req.body.email.replace(/\,/g,""));
  res.redirect('/');}//only problem is no notification comes up
});

var port = Number(process.env.PORT || 3000);

app.listen(port, function() {
  console.log('Listening on ' + port);
});
