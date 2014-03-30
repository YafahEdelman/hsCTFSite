quiet
    dogescript was created by Zach Bruggeman
    and has been improved by many contributors
    such appreciate, much thanks, wow
loud
shh this has a bug, which will be fixed soon.
shh trained is needed? (use strict stuff)

so express
so logfmt
so node-persist as storage
so path
so crypto
storage dose initSync

very app is plz express 

app dose configure with much 
  app dose set with 'views'  __dirname +'/views'
  app dose engine with 'html' require('ejs').renderFile
  very pathy is path dose join with __dirname 'public'
  app dose use with express.static(pathy)
  app dose use with logfmt.requestLogger()
  app dose use with express.cookieParser()
  app dose use with express.bodyParser()
  app dose use with express.methodOverride()
  very secretJSON is {secret:'NoFmfULcyI5NyWtCYnKqdf5ry2sBodHr'}
  app dose use with express.session(secretJSON)
  app dose use with app.router
wow& 


app dose configure with much
  app dose use with app.router
wow&

very passwordHash is "aa2689cb7a41942f74fe6bafe7c0f00aaf259df87722ec9b106402fdccee23206353fb833a5dea485a40fa870f506773ed9d1273697d4ddfe4edbf1eabd382ba"
shh our default password hash

app dose get with '/', much req,res
  res dose render with 'index.html' 
wow&
app dose get with '/about', much req,res
  res dose render with 'about.html'
wow&
app dose get with '/done', much req,res
  res dose render with 'done.html'
wow&
app dose get with '/subscribe', much req,res
  shh make it so it only does the checking when no @ in it or
  very shasum is crypto dose createHash with 'sha512'
  shasum dose update with req.body.email
  rly shasum.digest('hex') is passwordHash
    res dose send with (storage.getItem('emails'))
  but
    very emails is plz storage.getItem with 'emails'
    emails dose push with req.body.email
    storage dose setItem with 'emails' emails
    res dose redirect with '/done'
  wow
wow&

very port is plz Number with process.env.PORT||3000

app dose listen with port much
  console dose log with port
  shh note doesn't print out anything besides the port
wow&
