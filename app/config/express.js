/* globals __dirname */

const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');

const init = (app) => {
    if (typeof app.use !== 'function' || typeof app.set !== 'function') {
        throw new Error('Invalid app');
    }

    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use('/static', express.static(path.join(__dirname, '../../public')));

    app.use(morgan('combined'));
    app.use(flash());
    app.use((req, res, next) => {
        res.locals.messages = require('express-messages')(req, res);
        console.log(res.locals.messages);
        next();
    });

    app.set('view engine', 'pug');
};

module.exports = {
    init,
};
