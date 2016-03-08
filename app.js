/**
 * Express configurations.
 *
 * @type {exports|module.exports}
 */
var Router = require('react-router');
var React = require('react/addons');
var express = require('express');
var config = require('./config');
var Iso = require('iso');
var session = require('express-session');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

//Define Routes here
var posts = require('./routes/post.routes');
var routes = require('./src/routes.jsx');
var alt = require('./src/alt');
var app = express();

app.set('views', __dirname+'/views');
app.set('view engine', 'jade');

app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: config.secret, resave: false, saveUninitialized: true}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit : '50mb'}));
app.use(cookieParser());

// login route.
app.get('/login', function (req, res) {
    if (req.session.userSignedIn) {
      res.redirect('/');
    }
    res.render('login');
});

app.post('/login', function (req, res) {
    req.session.userSignedIn = true;
    res.redirect('/');
});

// logout route.
app.use('/logout', function (req, res) {
    req.session.userSignedIn = false;
    res.redirect('/login');
});

// use Routes here
app.use('/',posts);
app.use(function (req, res) {
    if (!req.session.userSignedIn) {
      res.redirect('/login');
    }
    alt.bootstrap(JSON.stringify(res.locals.data || {}));
    var iso = new Iso();
    Router.run(routes, req.url, function (Handler) {
        var content = React.renderToString(React.createElement(Handler));
        iso.add(content, alt.flush());
        res.render('index',{content:iso.render()});
    });
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    if(!err.status || err.status !== 404){
        err.status = 500;
    }
    console.log(err);
    res.status(err.status);
    res.sendFile(path.resolve(__dirname+'/views/error/'+err.status+'.html'));
});

var express = config.express;
var port = (express.port) ? express.port : '8088';

app.listen(port, function () {
    console.log('Listening on port ', port);
});
