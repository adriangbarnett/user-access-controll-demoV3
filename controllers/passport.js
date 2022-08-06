const { authenticate } = require("passport");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require('bcryptjs');
const User = require("../models/user.model.js");



function initialize(passport) {

    console.log("Passport: initialize");

    // login
    passport.use(new localStrategy(function (username, password, done) {
        
        // check if user exist
         User.findOne({ username: username }, function (err, user) {
            if (err) return done(err);
            
            if (!user) { 
                return done(null, false, { message: 'Passport: usrename not found' });
            }

            // compatre password
            bcrypt.compare(password, user.password, function (err, res) {
                if (err) return done(err);

                if (res === false) {
                    return done(null, false, { message: 'Passport: incorrect password' });
                } 

                //success
                return done(null, user);
            });
        });
    }));

    // post login event
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    
    // post login event
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });

}

// Is
//checkAutenticated
function isAuth(req, res, next) {

    //console.log("Passport: isAuth");

    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/login");

}

// Not
//checkNotAutenticated
function isNotAuth(req, res, next) {

    //console.log("Passport: isNotAuth");

    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    // not
    return next();
    
}


module.exports =  {
    initialize,
    isAuth,
    isNotAuth,
}