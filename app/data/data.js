const {
    tag,
    subreadit,
} = require('../../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');
const CommentsData = require('./comments.data');
const PostData = require('./posts.data');

module.exports = {
    tags: new Data(tag),
    posts: new PostData(),
    comments: new CommentsData(),
    users: new UsersData(),
    subreadits: new Data(subreadit),
};
