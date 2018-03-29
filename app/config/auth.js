const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('../config');
const bcrypt = require('bcrypt');
const {
    Strategy,
} = require('passport-local');

const init = (app, data) => {
    passport.use(new Strategy(async (username, password, done) => {
        const user = await data.users.findByUserName(username);
        if (!user) {
            done(null, false, {
                message: 'Incorrect username!',
            });
        } else {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    return done(err);
                }
                if (!res) {
                    return done(null, false, {
                        message: 'Incorrect Password',
                    });
                }
                return done(null, user);
            });
        }
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
