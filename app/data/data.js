const {
    tag,
    post,
    subreadit,
} = require('../../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');
const CommentsData = require('./comments.data');

module.exports = {
    tags: new Data(tag),
    posts: new Data(post),
    comments: new CommentsData(),
    users: new UsersData(),
    subreadits: new Data(subreadit),
};
