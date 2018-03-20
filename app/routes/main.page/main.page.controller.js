class MainPageController {
    constructor(data) {
        this.data = data;
    }
    getAll() {
        const posts = this.data.posts.getAll();
        return posts;
    }
    async getMainPageInfoById(postId) {
        const {
            image,
            name,
            userId,
            subreaditId,
        } = await this.data.posts.getById(postId);

        const numberofComments =
            (await this.data.comments.getAllById(postId)
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
}

module.exports = MainPageController;
