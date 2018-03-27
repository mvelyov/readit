class HomeController {
    constructor(data) {
        this.data = data;
    }
    async getAllSubreadits() {
        const subreadits = await this.data.subreadits.getAll();
        return subreadits;
    }

    async getAllPosts() {
        const posts = this.data.posts.getAll();
        return posts;
    }

    async getPostsInfo(sortedByAge = '') {
        let posts;
        if (!sortedByAge) {
            posts = await this.getAllPosts();
        } else if (sortedByAge === 'ASC') {
            posts = await this.data.posts.getAllSortedByCreatedAt('ASC');
        } else {
            posts = await this.data.posts.getAllSortedByCreatedAt();
        }
        await Promise.all(posts.map(async (post) => {
            post.tags = await post.getTags();
            let tags = post.tags;
            tags = tags.map((tag) => tag.dataValues.name);
            post.tags = tags;
        }));
        posts = await Promise.all(posts.map(async (post) => {
            const {
                image,
                name,
                userId,
                subreaditId,
                content,
                id,
                tags,
            } = post;
            const {
                userName,
                avatar,
            } = await this.data.users.getById(post.userId);
            let subreaditName = await this.data.subreadits.getById(subreaditId);
            subreaditName = subreaditName.name;
            post = {
                id,
                name,
                content,
                image,
                userId,
                userName,
                avatar,
                subreaditId,
                subreaditName,
                tags,
            };
            return post;
        }));
        await Promise.all(posts.map(async (post) => {
            post.comments = await this.data.comments.getCommentsOnPost(post.id)
                .map((comment) => comment.dataValues.content);
            post.commentsCount = post.comments.length || 0;
        }));
        return {
            posts,
        };
    }
    async sortByAge(condition) {
        return await this.getPostsInfo(condition);
    }
    async sortByNumberOfComments(postsArr, condition = 'DESC') {
        if (condition === 'ASC') {
            postsArr.sort((a, b) => a.commentsCount - b.commentsCount);
        } else {
            postsArr.sort((a, b) => b.commentsCount - a.commentsCount);
        }
        return postsArr;
    }
}

module.exports = HomeController;
