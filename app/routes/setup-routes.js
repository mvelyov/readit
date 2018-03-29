/* globals __dirname __filename */

const fs = require('fs');
const path = require('path');

const init = (app, data) => {
    fs.readdirSync(__dirname)
        .filter((filename) => filename !== path.basename(__filename))
        .filter((filename) => filename !== 'index.js')
        // relative to absolute path
        .map((filename) => path.join(__dirname, filename))
        .forEach((modulePath) => {
            const route = require(modulePath);
            route.init(app, data);
        });
    app.get('/*', (req, res) => {
        res.render('notFound');
    });
};

/** dynamically load all routes */

module.exports = {
    init,
};
