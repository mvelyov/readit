class UserController {
    constructor(data) {
        this.data = data;
    }
    async createUser(userObject) {
        try {
            const newUser = await this.data.users.create(userObject);
            return {
                newUser,
            };
        } catch (error) {
            return {
                errors: error.message + ': User already exists!',
            };
        }
    }
    async getUserPostsAndComments(username) {
        const {
            id,
            userName,
            avatar,
        } = await this.data.users.findByUserName(username);

        const comments = await this.data.comments.getCommentsForEachUser(id);
        const posts = await this.data.posts.getAllPostsByUserId(id);

        return {
            id,
            userName,
            avatar,
            comments,
            posts,
        };
    }
}

module.exports = UserController;
