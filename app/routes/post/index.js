const postRoutes = require('./post.routes');

const init = (app, data) => {
    postRoutes.init(app, data);
};

module.exports = {
    init,
};
