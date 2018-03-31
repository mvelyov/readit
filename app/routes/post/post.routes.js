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
        })
        .get('/post/delete/:subreadit/:id', async (req, res) => {
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
                res.render('post/deletePost', model);
            } else {
                res.redirect('/user/login');
            }
        })
        .post('/post/delete/:subreadit/:id', async (req, res) => {
            const subreadit = req.params.subreadit;
            const postId = Number(req.params.id);
            await subreaditController.deletePost(postId);
            await subreaditController.deleteCommentsFromPost(postId);
            res.redirect('/r/' + subreadit);
        })
        .get('/edit/:subreadit/post/comment/:id', async (req, res) => {
            if (req.isAuthenticated()) {
                const commentId = req.params.id;
                let loggedUserId;
                const authenticated = req.isAuthenticated();
                if (authenticated) {
                    loggedUserId = req.user.id;
                }
                const commentsInfo = await controller.getCommentInfo(commentId);
                const subreaditName = req.params.subreadit;
                const model = {
                    commentsInfo,
                    loggedUserId,
                    subreaditName,
                };
                res.render('post/editComment', model);
            } else {
                res.redirect('/user/login');
            }
        })
        .post('/edit/:subreadit/post/comment/:id', async (req, res) => {
            const updatedComment = req.body;
            const commentId = Number(req.params.id);
            const comment = await subreaditController.updateComment(updatedComment, commentId);
            const subreaditName = req.params.subreadit;
            res.redirect('/r/' + subreaditName + '/post/' + comment.postId);
        })
        .get('/delete/:subreadit/post/comment/:id', async (req, res) => {
            if (req.isAuthenticated()) {
                const commentId = req.params.id;
                let loggedUserId;
                const authenticated = req.isAuthenticated();
                if (authenticated) {
                    loggedUserId = req.user.id;
                }
                const commentsInfo = await controller.getCommentInfo(commentId);
                const subreaditName = req.params.subreadit;
                const model = {
                    commentsInfo,
                    loggedUserId,
                    subreaditName,
                };
                res.render('post/deleteComment', model);
            } else {
                res.redirect('/user/login');
            }
        })
        .post('/delete/:subreadit/post/comment/:id', async (req, res) => {
            const updatedComment = req.body;
            const commentId = Number(req.params.id);
            const comment = await subreaditController.deleteComment(commentId);
            const subreaditName = req.params.subreadit;
            res.redirect('/r/' + subreaditName + '/post/' + comment.postId);
        });
};

module.exports = {
    init,
};
