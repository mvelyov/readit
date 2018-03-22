class ReadItController {
    constructor(data) {
        this.data = data;
    }

    async getAllPosts() {
        const posts = await this.data.posts.getAll();
        return posts;
    }

    // async getPostsBySubreadit(subreaditNameOrId) {
    //     let subreaditId = await this.data.subreadits.getByName(subreaditNameOrId);
    //     // subreaditId = subreaditId.dataValues.id;
    //     subreaditId = subreaditId.id;
    //     // if (!isNaN(subreaditNameOrId)) {
    //     //     subreaditId = subreaditNameOrId;
    //     // } else {
    //     //     subreaditId = subreaditId.dataValues.id;
    //     // }
    //     const posts = await this.data.posts.getAll({
    //         where: {
    //             subreaditId: subreaditId,
    //         },
    //     });
    //     return posts;
    // }

    async getPostsBySubreadit(subreaditNameOrId) {
        const {
            id,
        } = await this.data.subreadits.getByName(subreaditNameOrId);
<<<<<<< HEAD
 
=======
        // subreaditId = subreaditId.dataValues.id;
        // const subreaditId = id;
        // if (!isNaN(subreaditNameOrId)) {
        //     subreaditId = subreaditNameOrId;
        // } else {
        //     subreaditId = subreaditId.dataValues.id;
        // }
>>>>>>> 83fcb3a4cb115eb68890173547ab2c3ab0b7ed07
        const posts = await this.data.posts.getAllSubreadits(id);
        return posts;
    }

    async getCreateData() {
        const [tags, subreadits] =
        await Promise.all([
            this.data.tag.getAll(),
            this.data.subreadits.getAll()]);
        return {
            tags,
            subreadits,
        };
    }

    async getInfo(postId) {
        const post = await this.data.posts.getById(postId);
        let tags = await post.getTags();
        tags = tags.map((tag) => tag.dataValues.name);
        const {
            image,
            name,
            userId,
            subreaditId,
            content,
            id,
        } = post;

        const comments =
            (await this.data.comments.getCommentsOnPost(postId)
                .map((item) => item.dataValues.content));

        const {
            userName,
        } = await this.data.users.getById(userId);

        const {
            avatar,
        } = await this.data.users.getById(userId);

        let subreaditName = await this.data.subreadits.getById(subreaditId);
        subreaditName = subreaditName.name;

        return {
            image,
            name,
            comments,
            userName,
            subreaditName,
            tags,
            avatar,
            content,
            id,
        };
    }

    async getUsersComments(username) {
        const {
            id,
        } = await this.data.users.findByUserName(username);

        const userComments =
            (await this.data.comments.getCommentsForEachUser(id)
                .map((item) =>
                [item.dataValues.content, item.dataValues.postId]));
        return {
            userComments,
        };
    }

    async createPost(postObject) {
        let userId = await this.data.users.findByUserName(postObject.user);
        userId = userId.dataValues.id || postObject.userId;
        const tagIds = Array.isArray(postObject.tags) ?
            postObject.tags : [postObject.tags];
        postObject.userId = userId;
        const currentTags = await Promise.all(
            tagIds.map((id) => {
                return this.data.tags.getById(id);
            }));
        const newPost = await this.data.posts.create(postObject);
        await newPost.setTags(currentTags);
        return newPost;
    }

    async createNewTag(name) {
        const newTag = await this.data.tags.findCreateFind({
            where: {
                name: name,
            },
        });
        return newTag;
    }

    async createNewComment(commentObj) {
        const newComment = await this.data.comments.create(commentObj);
        return newComment;
    }
}

module.exports = ReadItController;
