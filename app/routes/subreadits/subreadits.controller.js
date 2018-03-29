const MainController = require('../home/home.controller');

class SubreaditController extends MainController {
    constructor(data) {
        super(data);
    }
    async getSubreaditIdByName(subreaditName) {
        const subreadit = await this.data.subreadits.getByName(subreaditName);
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
        let tagIds;
        if (postObject.tagIds) {
            tagIds = Array.isArray(postObject.tagsId) ?
                postObject.tagsId : [postObject.tagsId];
        }
        if (!postObject.image) {
            delete postObject.image;
        }
        const newPost = await this.data.posts.create(postObject);
        if (tagIds) {
            await newPost.setTags(tagIds);
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
}

module.exports = SubreaditController;
