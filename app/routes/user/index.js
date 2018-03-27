const userRoutes = require('./user.routes');

const init = (app, data) => {
    userRoutes.init(app, data);
};

module.exports = {
    init,
};
