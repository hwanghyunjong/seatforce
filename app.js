var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
// var cookieParser = require('cookie-parser');
// var expressSession = require('express-session');
var engine = require('ejs-locals');
// var firebase = require('firebase');

var loginRouter = require('./routes/login');
// var joinRouter = require('./routes/signup');
// var mainRouter = require('./routes/main');
// var logoutRouter = require('./routes/logout');
// var profileRouter = require('./routes/profile');
// var freeboardRouter = require('./routes/board');
// var scheduleRouter = require('./routes/schedules');
// var boardReadRouter = require('./routes/boardread');
// var boardWriteRouter = require('./routes/boardwrite');

var app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// app.use(cookieParser());
// app.use(expressSession({
//     secret: 'my key',
//     resave: true,
// 	saveUninitialized: true,
// 	cookie: {
// 		maxAge: 1000 * 60 * 60
// 	}
// }));

app.get('/', function(req, res, next) {
	res.redirect('/login');
	console.log(req.session);
});


app.use('/login', loginRouter);
// app.use('/signup', joinRouter);
// app.use('/main', mainRouter);
// app.use('/logout', logoutRouter);
// app.use('/profile', profileRouter);
// app.use('/board', freeboardRouter);
// app.use('/schedules', scheduleRouter);
// app.use('/boardRead', boardReadRouter);
// app.use('/boardWrite', boardWriteRouter);

app.use("/", express.static(path.join(__dirname,"./views")))

app.engine('ejs', engine);

app.listen(3000, () => {
	console.log('server start');
})