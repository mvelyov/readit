const {
    expect,
} = require('chai');

const Data = require('../../app/data/generic.data');
const CommentsData = require('../../app/data/comments.data');

describe('Comments Data', () => {
    let data = null;
    let comment = null;
    let postId = null;
    let userId = null;
    let Model = {
        findAll: () => {},
    };

    class CommentsData extends Data {
        constructor() {
            super(comment);
        }
        getCommentsOnPost(postId) {
            return Model.findAll();
        };
        getCommentsForEachUser(userId) {
            return Model.findAll();
        }
    }

    data = new CommentsData();

    describe('getCommentsOnPost()', () => {
        it('when comments exist, expect to return all comments', async () => {
            const postId = 1;
            const comments = ['comment1', 'comment2'];

            Model.findAll = async () => {
                return await comments;
            }

            const resultObject = await data.getCommentsOnPost(postId);
            expect(resultObject).to.be.equal(comments);
        })
        it('when comments dont exist, expect to return null', async () => {
            const postId = 1;
            const comments = null;

            Model.findAll = () => {
                return comments;
            }

            const resultObject = await data.getCommentsOnPost(postId);
            expect(resultObject).to.be.equal(comments);
        })
    })
    describe('getCommentsForEachUser()', () => {
        it('when comments exist, expect to return all comments', async () => {
            const userId = 1;
            const commentsFromUser = ['test comment'];

            Model.findAll = () => {
                return commentsFromUser;
            }

            const resultObject = await data.getCommentsForEachUser(userId);
            expect(resultObject).to.be.equal(commentsFromUser);
        })
    })
})