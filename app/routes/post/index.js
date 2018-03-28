const postRoutes = require('./post.routes');
const apiRoutes = require('./api.post.routes');

const init = (app, data) => {
    postRoutes.init(app, data);
    apiRoutes.init(app, data);
};

module.exports = {
    init,
};
