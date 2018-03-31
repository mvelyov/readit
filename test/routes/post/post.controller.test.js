const {
    expect,
} = require('chai');

const PostController = require('../../../app/routes/post/post.controller');

const usersDB = [{
    id: 1,
    userName: 'ironman',
    password: '093ur32jf329f23fj3209f923jf',
    avatar: 'http://www.randomurl.com/niceAvatarPic.png',
    createdAt: '2018-03-29 21:26:38',
    updatedAt: '2018-03-29 21:26:38',
}];
const subreaditsDB = [{
    id: 1,
    name: 'Avengers',
    headerImage: 'http://www.thirdRandomUrl.com/VERYNICEHEADERIMAGE.png',
    createdAt: '2018-03-29 21:26:38',
    updatedAt: '2018-03-29 21:26:38',
}];

const commentsDB = [{
    id: 1,
    content: 'Ironman is better than batman',
    postId: 1,
    userId: 1,
    createdAt: '2018-03-29 21:26:38',
    updatedAt: '2018-03-29 21:26:38',
}];

const postsDB = [{
    id: 1,
    name: 'Avengers are the best',
    content: 'Avengers are waaaay better than the Justice League',
    image: 'http://www.stopWithTheRandomUrlsAlready.com/Avengers.png',
    subreaditId: 1,
    userId: 1,
    createdAt: '2018-03-29 21:26:38',
    updatedAt: '2018-03-29 21:26:38',
    getTags: () => {
        return tags = [{
            id: 1,
            name: 'funny',
        }]
    },
}];

const testData = {
    comments: {
        create(obj) {
            const comment = commentsDB.find((comment) => comment.content === obj.content);
            if (!comment) {
                commentsDB.push(obj);
                return obj;
            } else {
                const error = new Error('comment already exists');
                return error;
            }
        },
        getById(id) {
            const comment = commentsDB.find((comment) => comment.id === id);
            return comment;
        },
        getCommentsOnPost(id) {
            let comments = commentsDB.find((comment) => comment.postId === id);
            comments = [comments];
            return comments;
        }
    },
    posts: {
        getById(id) {
            const post = postsDB.find((post) => post.id === id);
            return post;
        },
    },
    users: {
        getById(id) {
            const user = usersDB.find((user) => user.id === id);
            return user;
        }
    },
    subreadits: {
        getById(id) {
            const subreadit = subreaditsDB.find((subreadit) => subreadit.id === id);
            return subreadit;
        }
    }
}

const controller = new PostController(testData);

describe('Testing PostController', () => {
    describe('Testing createNewComment method', () => {
        it('If comment doesn\'t exist, it should create comment', async () => {
            const newComment = {
                id: 2,
                content: 'Batman Sux',
                postId: 1,
                userId: 1,
                createdAt: '2018-03-29 21:26:38',
                updatedAt: '2018-03-29 21:26:38',
            };
            const result = await controller.createNewComment(newComment);
            expect(commentsDB.length).to.equal(2);
            expect(result).to.deep.equal(newComment);
        });

        it('If comment already exists, it should return an error', async () => {
            const newComment = {
                id: 1,
                content: 'Ironman is better than batman',
                postId: 1,
                userId: 1,
                createdAt: '2018-03-29 21:26:38',
                updatedAt: '2018-03-29 21:26:38',
            };
            const result = await controller.createNewComment(newComment);
            expect(commentsDB.length).to.equal(2);
            expect(result).to.be.instanceOf(Error);
        });
    });
    describe('Testing getCommentInfo method', () => {
        it('if comment id is correct it should return the comment object', async () => {
            const result = await controller.getCommentInfo(1);
            expect(result).to.deep.equal({ id: 1,
                content: 'Ironman is better than batman',
                postId: 1,
                userId: 1,
                createdAt: '2018-03-29 21:26:38',
                updatedAt: '2018-03-29 21:26:38' });
        });

        it('if id does not exist, it should return undefined', async () => {
            const result = await controller.getCommentInfo(5);
            expect(result).to.equal(undefined);
        });
    });
    describe('Testing getPostInfo method', () => {
        it('If postId does not exist, it should return an error', async () => {
            const result = await controller.getPostInfo(5);
            expect(result).to.be.instanceOf(Error);
        });

        it('if postId is valid, method should return image, name, comments, userName, userId, subreaditName, tags, avatar, content, id, createdAgo, updatedAgo', async () => {
            const result = await controller.getPostInfo(1);
            expect(result).to.be.instanceOf(Object);
            expect(result.image).to.equal('http://www.stopWithTheRandomUrlsAlready.com/Avengers.png');
            expect(result.name).to.equal('Avengers are the best');
            expect(result.userName).to.equal('ironman');
        })
    });
})