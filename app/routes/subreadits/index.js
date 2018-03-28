const subreaditRoutes = require('./subreadits.routes');
const apiRoutes = require('./api.subreadits.routes');

const init = (app, data) => {
    subreaditRoutes.init(app, data);
    apiRoutes.init(app, data);
};

module.exports = {
    init,
};
