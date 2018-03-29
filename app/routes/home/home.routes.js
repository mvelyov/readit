const {
    Router,
} = require('express');
const HomeController = require('./home.controller');

const init = (app, data) => {
    const controller = new HomeController(data);
    const router = new Router();
    const headerImage = 'https://www.freewebheaders.com/wordpress'+
    '/wp-content/gallery/other-backgrounds'+
    '/red-lonely-chair-website-header-design.jpg';
    const attachSubreaditsToNav = async (req, res, next) => {
        const subreadits = await controller.getAllSubreadits();
        app.locals.subreadits = subreadits || null;
        return next();
    };
    app.use(attachSubreaditsToNav);
    app.use('', router);
    router
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/home', async (req, res) => {
            const postsLists = await controller.getPostsInfo();
            const model = {
                postsLists,
                headerImage,
            };
            res.render('home', model);
        })
        .get('/home/newest', async (req, res) => {
            const postsLists = await controller.sortByAge('ASC');
            const model = {
                postsLists,
                headerImage,
            };
            res.render('home', model);
        })
        .get('/home/oldest', async (req, res) => {
            const postsLists = await controller.sortByAge('DESC');
            const model = {
                postsLists,
                headerImage,
            };
            res.render('home', model);
        })
        .get('/home/hottest', async (req, res) => {
            const postsLists = await controller.sortByNumberOfComments('DESC');
            const model = {
                postsLists,
                headerImage,
            };
            res.render('home', model);
        })
        .get('/home/coldest', async (req, res) => {
            const postsLists = await controller.sortByNumberOfComments('ASC');
            const model = {
                postsLists,
                headerImage,
            };
            res.render('home', model);
        });
};

module.exports = {
    init,
};
