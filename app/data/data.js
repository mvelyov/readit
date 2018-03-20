const {
    tag,
    post,
    comment,
} = require('../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');

module.exports = {
    tags: new Data(tag),
    posts: new Data(post),
    comment: new Data(comment),
    users: new UsersData(),
};
