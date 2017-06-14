const path = require('path'),
      fs = require('fs'),
      express = require('express'),
      exphbs = require(`express-handlebars`),
      PORT = process.env.PORT || 3000,
      IP = process.env.IP || "0.0.0.0",
      app = express(),
      routes = require('./routes/routes'),
      passport = require('passport'),
      bodyParser = require('body-parser'),
      multer = require('multer'),
      flash = require('connect-flash'),
      cookieSession = require('cookie-session');

require('./passport/passport')(passport);

app.use(bodyParser.urlencoded({extended: true}));
app.use(flash());
app.use('/public',express.static(path.join(__dirname,'/public')));
app.use('/css',express.static(path.join(__dirname,'/public/css')));
app.use('/img',express.static(path.join(__dirname,'/public/img')));
app.use('/fonts',express.static(path.join(__dirname,'/public/fonts')));
app.use(express.static(__dirname + '/static/vendor'));
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));
app.use(passport.initialize());
app.use(passport.session());


app.use('/',routes)

app.listen(PORT,IP,(err)=>{
    if(err)
    {
        console.log("> Error al iniciar el servidor");
        throw err;
    }
    console.log(`> Server escuchando en http://${IP}:${PORT}...`);
});