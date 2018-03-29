const {
    Router,
} = require('express');

const SubreaditController = require('./subreadits.controller');
const ta = require('../../../node_modules/time-ago/timeago');

const init = (app, data) => {
    const controller = new SubreaditController(data);
    const router = new Router();
    app.use('', router);
    router
        .get('/r', (req, res) => {
            res.redirect('/subreadits');
        })
        .get('/subreadits', async (req, res) => {
            const subreadits = await controller.getAllSubreadits();
            const model = {
                subreadits,
            };
            res.render('subreadits/subreadits', model);
        })
        .get('/r/:subreadit', async (req, res) => {
            const subreadit = req.params.subreadit;
            const {
                id,
                headerImage,
            } = await controller.getSubreaditIdByName(subreadit);
            let posts = await controller.getPostsBySubreadit(subreadit);
            posts = posts.map((post) => {
                post.timeAgo = ta.ago(post.createdAt);
                return post;
            });
            const model = {
                subreadit,
                posts,
                id,
                headerImage,
            };
            res.render('subreadits/subreadit', model);
        })
        .get('/r/:subreadit/newest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const {
                id,
                headerImage,
            } = await controller.getSubreaditIdByName(subreadit);
            const posts = await controller
                .sortSubreaditPostsByAge('DESC', subreadit);
            const model = {
                subreadit,
                posts,
                id,
                headerImage,
            };
            res.render('subreadits/subreadit', model);
        })
        .get('/r/:subreadit/oldest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const {
                id,
                headerImage,
            } = await controller.getSubreaditIdByName(subreadit);
            const posts = await controller
                .sortSubreaditPostsByAge('ASC', subreadit);
            const model = {
                subreadit,
                posts,
                id,
                headerImage,
            };
            res.render('subreadits/subreadit', model);
        })
        .get('/r/:subreadit/hottest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const {
                id,
                headerImage,
            } = await controller.getSubreaditIdByName(subreadit);
            let posts = await controller.getPostsBySubreadit(subreadit);
            posts = controller.sortByNumberOfComments(posts, 'DESC');
            const model = {
                subreadit,
                posts,
                id,
                headerImage,
            };
            res.render('subreadits/subreadit', model);
        })
        .get('/r/:subreadit/coldest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const {
                id,
                headerImage,
            } = await controller.getSubreaditIdByName(subreadit);
            let posts = await controller.getPostsBySubreadit(subreadit);
            posts = controller.sortByNumberOfComments(posts, 'ASC');
            const model = {
                subreadit,
                posts,
                id,
                headerImage,
            };
            res.render('subreadits/subreadit', model);
        })
        .get('/r/:subreadit/create', async (req, res) => {
            if (req.isAuthenticated()) {
                const subreadit = req.params.subreadit;
                const {
                    headerImage,
                } = await controller.getSubreaditIdByName(subreadit);
                const {
                    tags,
                    subreadits,
                } = await controller.getCreateData();
                const model = {
                    tags,
                    subreadit,
                    subreadits,
                    headerImage,
                };
                res.render('create/post', model);
            } else {
                res.redirect('/user/login');
            }
        })
        .post('/r/:subreadit', async (req, res) => {
            req.check('name', 'Title field is required!').isLength({
                min: 1,
            });
            req.check('content', 'Content field is required!').isLength({
                min: 1,
            });

            const subreadit = req.params.subreadit;
            const post = req.body;
            post.userId = req.user.id;
            post.subreaditId = Number(post.subreaditId);
            if (post.tagsId) {
                post.tagsId = Array.isArray(post.tagsId) ?
                    post.tagsId.map(Number) : [post.tagsId].map(Number);
            } else {
                delete post.tagIds;
            }
            const errors = req.validationErrors();
            if (errors) {
                const {
                    tags,
                    subreadits,
                } = await controller.getCreateData();
                const model = {
                    tags,
                    subreadit,
                    subreadits,
                    errors,
                };
                res.render('create/post', model);
            } else {
                await controller.createPost(post);
                res.redirect('/r/' + subreadit);
            }
        });
};

module.exports = {
    init,
};
