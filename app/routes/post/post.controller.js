const MainController = require('../home/home.controller');
const ta = require('../../../node_modules/time-ago/timeago');

class PostController extends MainController {
    constructor(data) {
        super(data);
    }

    async getPostInfo(postId) {
        const post = await this.data.posts.getById(postId);
        let tags = await post.getTags();
        if (tags) {
            tags = tags.map((tag) => tag.dataValues.name);
        } else {
            tags = null;
        }
        post.timeAgo = ta.ago(post.createdAt);
        const {
            image,
            name,
            userId,
            subreaditId,
            content,
            id,
            createdAt,
            timeAgo,
        } = post;

        const comments =
            (await this.data.comments.getCommentsOnPost(postId)
                .map(async (item) => {
                    const comment = {};
                    comment.id = item.dataValues.id;
                    comment.content = item.dataValues.content;
                    comment.userId = item.dataValues.userId;
                    comment.postId = item.dataValues.postId;
                    comment.createdAt = ta.ago(item.dataValues.createdAt);
                    comment.updatedAt = ta.ago(item.dataValues.updatedAt);
                    comment.user =
                        await this.data.users.getById(comment.userId);
                    comment.userName = comment.user.dataValues.userName;
                    comment.userAvatar = comment.user.dataValues.avatar;
                    delete comment.user;
                    return comment;
                }));

        const {
            userName,
        } = await this.data.users.getById(userId);

        const {
            avatar,
        } = await this.data.users.getById(userId);

        let subreaditName = await this.data.subreadits.getById(subreaditId);
        subreaditName = subreaditName.name;

        return {
            image,
            name,
            comments,
            userName,
            userId,
            subreaditName,
            tags,
            avatar,
            content,
            id,
            createdAt,
            timeAgo,
        };
    }

    async createNewComment(commentObj) {
        const newComment = await this.data.comments.create(commentObj);
        return newComment;
    }
    async getCommentInfo(id) {
        const commentsInfo = await this.data.comments.getById(id);
        return commentsInfo;
    }
}

module.exports = PostController;
