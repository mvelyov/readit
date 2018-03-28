const {
    Router,
} = require('express');
const HomeController = require('./home.controller');

const init = (app, data) => {
    const controller = new HomeController(data);
    const router = new Router();
    const attachSubreaditsToNav = async (req, res, next) => {
        const subreadits = await controller.getAllSubreadits();
        app.locals.subreadits = subreadits || null;
        return next();
    };
    app.use(attachSubreaditsToNav);
    app.use('/api', router);
    router
        .get('/home', async (req, res) => {
            const postsLists = await controller.getPostsInfo();
            const model = {
                postsLists,
            };
            res.send(model);
        })
        .get('/home/newest', async (req, res) => {
            const postsLists = await controller.sortByAge('ASC');
            const model = {
                postsLists,
            };
            res.send(model);
        })
        .get('/home/oldest', async (req, res) => {
            const postsLists = await controller.sortByAge('DESC');
            const model = {
                postsLists,
            };
            res.send(model);
        })
        .get('/home/hottest', async (req, res) => {
            const postsLists = await controller.sortByNumberOfComments('DESC');
            const model = {
                postsLists,
            };
            res.send(model);
        })
        .get('/home/coldest', async (req, res) => {
            const postsLists = await controller.sortByNumberOfComments('ASC');
            const model = {
                postsLists,
            };
            res.send(model);
        });
};

module.exports = {
    init,
};
