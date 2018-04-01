const {
    Router,
} = require('express');

const PostController = require('./post.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new PostController(data);
    app.use('/api/r/:subreadit', router);
    router
        .get('/post/:id', async (req, res) => {
            const postId = req.params.id;
            let loggedUserId;
            const authenticated = req.isAuthenticated();
            if (authenticated) {
                loggedUserId = req.user.id;
            }
            const postInfo = await controller.getPostInfo(postId);
            const info = {
                postInfo,
                loggedUserId,
                authenticated,
            };
            res.send(info);
        })
        .post('/post/:id', async (req, res) => {
            const newComment = req.body;
            console.log(newComment);
            // const subreadit = req.params.subreadit;
            const postId = req.params.id;
            const userId = req.user.id;
            newComment.postId = Number(postId);
            newComment.userId = Number(userId);
            await controller.createNewComment(newComment);
            let loggedUserId;
            const authenticated = req.isAuthenticated();
            if (authenticated) {
                loggedUserId = req.user.id;
            }
            const postInfo = await controller.getPostInfo(postId);
            const info = {
                postInfo,
                loggedUserId,
                authenticated,
            };
            req.flash('success', 'comment added');
            res.send(info);
        });
};

module.exports = {
    init,
};
