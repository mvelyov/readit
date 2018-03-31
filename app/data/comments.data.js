const Data = require('./generic.data');

const {
    comment,
} = require('../../db/models');

class CommentsData extends Data {
    constructor() {
        super(comment);
    }

    getCommentsOnPost(id) {
        return this.Model.findAll({
            where: {
                postId: id,
            },
        });
    }
    getCommentsForEachUser(id) {
        return this.Model.findAll({
            where: {
                userId: id,
            },
        });
    }
    deleteComments(id) {
        this.Model.destroy({
            where: {
                postId: id,
            },
        });
    }
    deleteComment(id) {
        this.Model.destroy({
            where: {
                id: id,
            },
        });
    }
}

module.exports = CommentsData;
