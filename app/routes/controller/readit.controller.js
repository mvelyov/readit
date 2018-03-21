class MainPageController {
    constructor(data) {
        this.data = data;
    }

    getAll() {
        const posts = this.data.posts.getAll();
        return posts;
    }

    async getMainPageInfo(postId) {
        const {
            image,
            name,
            userId,
            subreaditId,
        } = await this.data.posts.getById(postId);

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
}

module.exports = MainPageController;
