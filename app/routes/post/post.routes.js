const {
    Router,
} = require('express');

const PostController = require('./post.controller');
const SubreaditController = require('../subreadits/subreadits.controller');

const init = (app, data) => {
    const router = new Router();
    const controller = new PostController(data);
    const subreaditController = new SubreaditController(data);
    app.use('', router);
    router
        .get('/r/:subreadit/post/:id', async (req, res) => {
            const postId = req.params.id;
            let loggedUserId;
            const authenticated = req.isAuthenticated();
            if (authenticated) {
                loggedUserId = req.user.id;
            }
            const postInfo = await controller.getPostInfo(postId);
            const model = {
                postInfo,
                loggedUserId,
                authenticated,
            };
            res.render('post/post', model);
        })
        .post('/r/:subreadit/post/:id', async (req, res) => {
            const newComment = req.body;
            const subreadit = req.params.subreadit;
            const postId = req.params.id;
            const userId = req.user.id;
            newComment.postId = Number(postId);
            newComment.userId = Number(userId);
            await controller.createNewComment(newComment);
            req.flash('success', 'comment added');
            res.redirect('/r/' + subreadit + '/post/' + newComment.postId);
        })
        .get('/post/edit/:subreadit/:id', async (req, res) => {
            if (req.isAuthenticated()) {
                const postId = req.params.id;
                let loggedUserId;
                const authenticated = req.isAuthenticated();
                if (authenticated) {
                    loggedUserId = req.user.id;
                }
                const postInfo = await controller.getPostInfo(postId);
                const model = {
                    postInfo,
                    loggedUserId,
                    authenticated,
                };
                res.render('post/editPost', model);
            } else {
                res.redirect('/user/login');
            }
        })
        .post('/post/edit/:subreadit/:id', async (req, res) => {
            const updatedPost = req.body;
            const subreadit = req.params.subreadit;
            const postId = req.params.id;
            const userId = req.user.id;
            updatedPost.postId = Number(postId);
            updatedPost.userId = Number(userId);
            await subreaditController.updatePost(updatedPost, postId);
            res.redirect('/r/' + subreadit);
        });
};

module.exports = {
    init,
};
