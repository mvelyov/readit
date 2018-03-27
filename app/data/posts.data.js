const Data = require('./generic.data');
const {
    post,
} = require('../../db/models');

class PostsData extends Data {
    constructor() {
        super(post);
    }

    getAllSortedByCreatedAt(howToSort = 'DESC') {
        if (howToSort === 'DESC') {
            return this.Model.findAll({
                order: [['createdAt', 'DESC']],
            });
        }
        return this.Model.findAll({
            order: [['createdAt', 'ASC']],
        });
    }

    getAllPostsBySubreaditId(id) {
        return this.Model.findAll({
                where: {
                    subreaditId: id,
                },
        });
    }
    getAllPostsByUserId(id) {
        return this.Model.findAll({
            where: {
                userId: id,
            },
        });
    }
}

module.exports = PostsData;
