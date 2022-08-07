// App
require('dotenv').config({ path: './config/.env' });
const express=require("express");
app = express();

// logger
app.use('*', function(req, res, next) {
    //console.log("LOGEVENT: " + req.method );
    next();
});

// middlewares
const session = require("express-session");
const passport = require("passport");
const flash = require("express-flash");
const methodOverride = require("method-override");

// Local vars
const localVars = require("./config/locals.js")

// controllers
const database = require ("./controllers/database.js");
const passportController = require("./controllers/passport.js");

// use middle wares
app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(methodOverride("_method")); // so we can use post request in form

// session
app.use(session(
    {
    secret: "mysecret123",
    resave: false, 
    saveUninitialized: true //was false
    }
));

// Passport
passportController.initialize(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Routes
indexRouter = require ("./routes/index.js");
apiRouter = require ("./routes/api.js");
useradminRouter = require ("./routes/useradmin.js");
app.use("/", indexRouter);
app.use("/api", apiRouter);
app.use("/admin", useradminRouter);

// LOGIN
app.post("/login", loginMiddleWare, passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login?error=true",
    failureFlash: true,
}))

//
const dev = require ("./tests/dev.js");
app.get("/dev", dev.get);
app.post("/dev", dev.post);

// dev test
function loginMiddleWare(req, res, next){
    //console.log("loginMiddleWare");
    next();
}

// LOGOUT (using: _method)
app.delete('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
});

// error
app.get("*", (req, res) => {
    res.send("404");
})



// START, port 3000
app.listen(process.env.PORT || process.env.LOCALHOST_PORT, function() { 
    database.connect();
    localVars.init();
    console.log("Server started")
});
