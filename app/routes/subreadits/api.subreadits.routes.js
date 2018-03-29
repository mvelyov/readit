const {
    Router,
} = require('express');

const SubreaditController = require('./subreadits.controller');

const init = (app, data) => {
    const controller = new SubreaditController(data);
    const router = new Router();
    app.use('/api', router);
    router
        .get('/subreadits', async (req, res) => {
            const subreadits = await controller.getAllSubreadits();
            const model = {
                subreadits,
            };
            res.send(model);
        })
        .get('/r/:subreadit', async (req, res) => {
            const subreadit = req.params.subreadit;
            const posts = await controller.getPostsBySubreadit(subreadit);
            const model = {
                subreadit,
                posts,
            };
            res.send(model);
        })
        .get('/r/:subreadit/newest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const posts = await controller
                .sortSubreaditPostsByAge('ASC', subreadit);
            const model = {
                subreadit,
                posts,
            };
            res.send(model);
        })
        .get('/r/:subreadit/oldest', async (req, res) => {
            const subreadit = req.params.subreadit;
            const posts = await controller
                .sortSubreaditPostsByAge('DESC', subreadit);
            const model = {
                subreadit,
                posts,
            };
            res.send(model);
        })
        .get('/r/:subreadit/hottest', async (req, res) => {
            const subreadit = req.params.subreadit;
            let posts = controller.getOnlySubreaditPosts(subreadit);
            posts = controller.sortByNumberOfComments(posts, 'DESC');
            const model = {
                subreadit,
                posts,
            };
            res.send(model);
        })
        .get('/r/:subreadit/hottest', async (req, res) => {
            const subreadit = req.params.subreadit;
            let posts = controller.getOnlySubreaditPosts(subreadit);
            posts = controller.sortByNumberOfComments(posts, 'ASC');
            const model = {
                subreadit,
                posts,
            };
            res.send(model);
        })
        .post('/r/:subreadit', async (req, res) => {
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
            await controller.createPost(post);
            res.status(201)
                .send(subreadit);
        });
};

module.exports = {
    init,
};
