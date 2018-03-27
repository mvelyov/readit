const homeRoutes = require('./home.routes');

const init = (app, data) => {
    homeRoutes.init(app, data);
};

module.exports = {
    init,
};
