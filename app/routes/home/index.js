const homeRoutes = require('./home.routes');
const apiRoutes = require('./api.home.routes');

const init = (app, data) => {
    homeRoutes.init(app, data);
    apiRoutes.init(app, data);
};

module.exports = {
    init,
};

