const MainController = require('../home/home.controller');

class SubreaditController extends MainController {
    constructor(data) {
        super(data);
    }
    async getSubreaditIdByName(subreaditName) {
        const subreadit = await this.data.subreadits.getByName(subreaditName);
        if (!subreadit) {
            const error = new Error('Subreadit by this name does not exisrt');
            return error;
        }
        const {
            id,
            headerImage,
        } = subreadit;
        return {
            id,
            headerImage,
        };
    }
    getOnlySubreaditPosts(arrayOfPosts, id) {
        const filteredArray = arrayOfPosts
            .filter((post) => post.subreaditId === id);
        return filteredArray;
    }
    async getPostsBySubreadit(subreaditName) {
        const {
            id,
        } = await this.getSubreaditIdByName(subreaditName);
        const allPosts = await this.getPostsInfo();
        const subreaditPosts = this.getOnlySubreaditPosts(allPosts.posts, id);
        return subreaditPosts;
    }

    async sortSubreaditPostsByAge(condition, subreaditName) {
        const {
            id,
        } = await this.getSubreaditIdByName(subreaditName);
        const allSortedPosts = await this.sortByAge(condition);
        const sortedSubreaditPosts =
            this.getOnlySubreaditPosts(allSortedPosts.posts, id);
        return sortedSubreaditPosts;
    }

    async createPost(postObject) {
        if (!postObject.image) {
            delete postObject.image;
        }
        const newPost = await this.data.posts.create(postObject);

        if (postObject.tagsId) {
            await newPost.setTags(postObject.tagsId);
        }
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
    async getCreateData() {
        const [tags, subreadits] =
        await Promise.all([
            this.data.tags.getAll(),
            this.data.subreadits.getAll(),
        ]);
        return {
            tags,
            subreadits,
        };
    }
    async updatePost(postObject, id) {
        if (!postObject.image) {
            delete postObject.image;
        }
        const updatedPost = await this.data.posts.update(postObject, id);

        if (postObject.tagsId) {
            await updatedPost.setTags(postObject.tagsId);
        }
        return updatedPost;
    }
    async deletePost(id) {
        await this.data.posts.delete(id);
    }
    async deleteCommentsFromPost(id) {
        await this.data.comments.deleteComments(id);
    }
}

module.exports = SubreaditController;
