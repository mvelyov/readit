const {
    expect,
} = require('chai');

const UserController = require('../../../app/routes/user/user.controller');

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

const commentsDB = [{
    id: 1,
    content: 'Ironman is better than batman',
    postId: 1,
    userId: 1,
    createdAt: '2018-03-29 21:26:38',
    updatedAt: '2018-03-29 21:26:38',
}];



const testData = {
    users: {
        create(obj) {
            const userIndex = usersDB.findIndex((user) => user.userName === obj.userName);
            if (userIndex < 0) {
                usersDB.push(obj);
                return obj;
            } else {
                throw new Error('error');
            }
        },
        findByUserName(username) {
            let currentUser = usersDB.find((user) => user.userName === username);
            return currentUser;
        }
    },
    subreadits: {
        getById(id) {
            const subreadit = subreaditsDB.find((subreadit) => subreadit.id === id);
            return subreadit;
        }
    },
    posts: {
        getById(id) {
            const post = postsDB.find((post) => post.id === id);
            return post;
        },
        getAllPostsByUserId(id) {
            let posts = postsDB.find((post) => post.userId === id);
            posts = [posts];
            return posts;
        },
        getTags() {
            return postsDB[0].tags;
        }
    },
    comments: {
        getCommentsForEachUser(id) {
            let comments = commentsDB.find((comment) => comment.userId === id);
            comments = [comments];
            return comments;
        }
    }
}

const controller = new UserController(testData);


describe('Testing UserController', () => {
    describe('Testing the createUser method', () => {

        it('If user already exists in database newUser.errors should exist', async () => {
            const newUser = {
                id: 2,
                userName: 'ironman',
                password: '382ur32f23j329f03209jf230',
                avatar: 'http://www.anotherrandomurl.com/superduperniceAvatarpic.png'
            }

            const newRegUser = await controller.createUser(newUser);

            expect(newRegUser.errors).to.exist;
            expect(usersDB.length).to.equal(1);
        });

        it('If user does not exist in database, newUser should be an object', async () => {

            const newUser = {
                id: 2,
                userName: 'NOTIRONMAN',
                password: '382ur32f23j329f03209jf230',
                avatar: 'http://www.anotherrandomurl.com/superduperniceAvatarpic.png'
            }

            const newRegUser = await controller.createUser(newUser);

            expect(newRegUser.newUser).to.deep.equals(newUser);
        })
    });
    describe('Test the getSubreaditNameByPostId method', () => {
        it('If post with such Id does not exist, it should return an error', async () => {
               const error = await controller.getSubreaditNameByPostId(5);
                expect(error).to.be.instanceOf(Error);
        });
        it('If post with such id exists, it should return the subreaditId and name', async () => {
            const {
                subreaditId,
                name,
            } = await controller.getSubreaditNameByPostId(1);

            expect(subreaditId).to.equal(1);
            expect(name).to.equal('Avengers');
        });
    });
    describe('Test getUserPostsAndComments method', () => {
        it('if username is valid, method should return id, userName, avatar, comments, posts', async () => {
            const {
                id,
                userName,
                avatar,
                comments,
                posts,
            } = await controller.getUserPostsAndComments('ironman');
            expect(id).to.equal(1);
            expect(userName).to.equal('ironman');
            expect(avatar).to.equal('http://www.randomurl.com/niceAvatarPic.png');
            expect(comments).to.deep.equal(commentsDB);
            expect(posts).to.deep.equal(postsDB);
        });
        it('if username is invalid, method should return an error', async () => {
            const error = await controller.getUserPostsAndComments('batman');
            expect(error).to.be.instanceOf(Error);
        })
    })
});