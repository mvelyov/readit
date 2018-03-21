class ReadItController {
    constructor(data) {
        this.data = data;
    }

    getAll() {
        const posts = this.data.posts.getAll();
        return posts;
    }

    async getMainPageInfo(postId) {
        const post = await this.data.posts.getById(postId);
        const tags = post.getTags();
        const {
            image,
            name,
            userId,
            subreaditId,
        } = post;

        const numberofComments =
            (await this.data.comments.getCommentsOnPost(postId)
                .map((item) => item.dataValues.content)).length;

        const {
            userName,
        } = await this.data.users.getById(userId);

        let subreaditName = await this.data.subreadits.getById(subreaditId);
        subreaditName = subreaditName.name;

        return {
            image,
            name,
            numberofComments,
            userName,
            subreaditName,
            tags,
        };
    }

    async getUsersComments(username) {
        const {
            id,
        } = await this.data.users.findByUserName(username);

        const userComments =
            (await this.data.comments.getCommentsForEachUser(id)
            .map((item) => [item.dataValues.content, item.dataValues.postId]));
        return {
            userComments,
        };
    }

    // async getPostsTags(postId) {
    //     let tags = await this.data.tags.findAll({
    //         include: [{
    //             model: this.data.post,
    //             where: {
    //                 postId: postId,
    //             },
    //         }],
    //     });
    //     tags = tags.map((tag, index) => tag[index].dataValues.name);

    //     return {
    //         tags,
    //     };
    // }
}

module.exports = ReadItController;

