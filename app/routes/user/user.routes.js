const passport = require('passport');
const {
    Router,
} = require('express');
const UserController = require('./user.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new UserController(data);
    app.use('', router);
    router
        .get('/user/register', (req, res) => {
            const errors = req.flash('error');
            res.render('auth/register', {
                errors: errors,
            });
        })
        .post('/user/register', async (req, res) => {
            req.check('userName', 'Invalid username! The username must be at least 1 character long!')
            .isLength({
                min: 1,
            });

            req.check('userName', 'The username must contains letters or numbers!').matches(/[a-zA-Z0-9]+/);

            req.check('password', 'Passwords must be at least 4 characters long!')
            .isLength({
                min: 4,
            });

            req.check('password', 'Password does not match the confirm password field!')
            .equals(req.body.confirmPassword);

            const validationErrors = req.validationErrors();

            if (validationErrors) {
                res.render('auth/register', {
                    validationErrors: validationErrors,
                });
            } else {
                const userObj = req.body;
                if (!userObj.avatar) {
                    delete userObj.avatar;
                }
                const newUser = await controller.createUser(userObj);
                if (newUser.newUser) {
                    req.flash('success', 'User Created!' +
                        ' Welcome to Readit! You can now log-in');
                    res.redirect('/user/login');
                } else {
                    const errors = newUser.errors;
                    req.flash('error', errors);
                    res.redirect('/user/register');
                }
            }
        })
        .get('/user/login', (req, res) => {
            const errors = req.flash('error');
            res.render('auth/login', {
                errors: errors,
            });
        })
        .post('/user/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/user/login',
            failureFlash: true,
        }))
        .get('/user/logout', (req, res) => {
            req.logout();
            res.redirect('/');
        })
        .get('/user/:username', async (req, res) => {
            const username = req.params.username;
            const {
                id,
                userName,
                avatar,
                comments,
                posts,
            } = await controller.getUserPostsAndComments(username);
            const model = {
                id,
                userName,
                avatar,
                comments,
                posts,
            };
            res.render('user/profile', model);
        });
};

module.exports = {
    init,
};
