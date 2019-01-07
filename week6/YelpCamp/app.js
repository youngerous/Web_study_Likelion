var express      = require('express'),
    app          = express(),
    bodyParser   = require('body-parser'),
    mongoose     = require('mongoose'),
    passport     = require('passport'),
    LocalStrategy= require('passport-local'),
    methodOverride = require('method-override'),
    Campground   = require('./models/campground'),
    Comment      = require('./models/comment'),
    User         = require('./models/user'),
    seedDB       = require('./seeds');

//requiring routes
var commentRoutes    = require('./routes/comments'),
    campgroundRoutes = require('./routes/campgrounds'),
    indexRoutes       = require('./routes/index');

mongoose.connect('mongodb://localhost/yelp_camp');
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(express.static(__dirname + "/public")); 
app.use(methodOverride('_method'));
// seedDB(); // 서버를 start할 때마다 실행
 
// PASSPORT CONFIGURATION
app.use(require('express-session')({
    secret: 'Once again Moja wins cutest dog!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    // 모든 route에 currentUser를 저장(어디서든 사용 가능)
    res.locals.currentUser = req.user;
    next();
});

app.use('/',indexRoutes);
app.use('/campgrounds/:id/comments',commentRoutes);
app.use("/campgrounds",campgroundRoutes);

app.listen(3000, function(){
    console.log('YelpCamp Server has started...');
});

/*
Authentication: for login
Authorization: giving permission for user
 */