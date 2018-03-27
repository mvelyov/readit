const subreaditRoutes = require('./subreadits.routes');

const init = (app, data) => {
    subreaditRoutes.init(app, data);
};

module.exports = {
    init,
};
