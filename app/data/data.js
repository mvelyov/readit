const {
    // example ; to be changed when models are ready
    tag,
    post,
    comment,
} = require('../db/models');

const Data = require('./generic.data');
const UsersData = require('./users.data');

module.exports = {
    // example ; to be changed when models are ready
    tags: new Data(tag),
    posts: new Data(post),
    comment: new Data(comment),
    users: new UsersData(),
};
