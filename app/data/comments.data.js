const Data = require('./generic.data');

const {
    comment,
} = require('../db/models');

class CommentsData extends Data {
    constructor() {
        super(comment);
    }

    getAllById(id) {
        return this.Model.findAll({
            where: {
                postId: id,
            },
        });
    }
}

module.exports = CommentsData;
