const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('../config');
const {
    Strategy,
} = require('passport-local');

const init = (app, data) => {
    passport.use(new Strategy(async (username, password, done) => {
        const user = await data.users.findByUserName(username);
        if (!user || user.password !== password) {
            done(null, false, {
                message: 'Incorrect username or password!',
            });
        }
        return done(null, user);
    }));
    passport.serializeUser((user, done) => {
        done(null, user.userName);
    });
    passport.deserializeUser(async (username, done) => {
        const user = await data.users.findByUserName(username);
        if (!user) {
            return done(new Error('invalid user'));
        }
        return done(null, user);
    });
    app.use(cookieParser());
    app.use(session({
        secret: config.secret,
        resave: true,
        saveUninitialized: true,
    }));
    app.use(passport.initialize());
    app.use(passport.session());
};

module.exports = {
    init,
};
