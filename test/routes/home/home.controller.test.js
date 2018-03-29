const {
    expect
} = require('chai');

const Controller = require('../../../app/routes/home/home.controller');

let postsArr = [];
let subreaditsArr =[];
let tagsArr =[];
let comentsArr =[];
let usersArr = [];


const data = {
    posts : {
        getAll() {
            return postsArr;
        },
        getAllSubreadits(id) {
            return postsArr.filter(post => post.subreaditId===id);
        },
        getById(postId){

        },
        getTags(){

        },
        create(postObject) {

        },
        setTags(currentTags) {

        }
    },
    subreadits : {
        getByName(subreaditName) {
            const subreadit = subreaditsArr.find(subr =>  subr.name ===subreaditName)
            return subreadit.id;
        },
        getAll() {
            return subreaditsArr;
        },
        getById(subreaditId) {

        }
    },
    tag : {
        getAll() {
            return tagsArr;
        },
        getById(id) {

        }
    },
    coments: {
        getCommentsOnPost(postId) {

        },
        create(commentObj) {

        }
    },
    users: {
        getById(userId) {

        },
        findByUserName(username) {

        },
        findByUserName(user) {

        }
    }
};

describe ('HomeController', () => {
    describe('getAllPosts', () => {
        it('when no post, expect empty array',async () => {
        
            postsArr = [];
            const controller = new Controller(data);

            const posts =await controller.getAllPosts();

            expect(posts).to.be.empty;
        });
        it('when posts exists, expect to return the posts',async () => {
        
            postsArr = [{
                name : 'postName1',
                id: 1
            }];
            const controller = new Controller(data);

            const posts =await controller.getAllPosts();

            expect(posts).to.exist;
            
        });
        it('when posts exists, expect to return the equals posts',async () => {
        
            postsArr = [{
                name : 'postName1',
                id: 1
            }];
            const controller = new Controller(data);

            const posts =await controller.getAllPosts();

            expect(posts[0].name).to.equal(postsArr[0].name);
        });
    });
    describe('getAllSubreadits', () => {
        it('when no subreadits, expect empty array',async () => {
            
            subreaditsArr = [];
            const controller = new Controller(data);
    
            const subreadit =await controller.getAllSubreadits();
    
            expect(subreadit).to.be.empty;
        });
        it('when subreadit exists, expect to return the subreadits',async () => {
            
            subreaditsArr = [{
                 name : 'Cats',
                 id: 1
            }];
            const controller = new Controller(data);
    
            const subreadits =await controller.getAllSubreadits();
    
            expect(subreadits).to.exist;
            
        });
        it('when subreadit exists, expect to return the equals subreadits',async () => {
            
            subreaditsArr = [{
                 name : 'Cats',
                 id: 1
            }];
            const controller = new Controller(data);
    
            const subreadits =await controller.getAllSubreadits();
    
            expect(subreadits[0].name).to.equal(subreaditsArr[0].name);
        });
    });
    describe('sortByNumberOfComments', () => {
        it('when condition no exists (DESC), expect to return the sorted array', async () => {
            postsArr = [
                {
                    name: 'post 1',
                    commentsCount: 2
                },
                {
                    name: 'post 2',
                    commentsCount: 5
                }
            ];
            const controller = new Controller(data);
            const pArray =await controller.sortByNumberOfComments(postsArr,);
    
            expect(pArray).to.exist;
            expect(pArray[0].name).to.equal(postsArr[0].name);
        });
        it('when condition is ASC, expect to return the sorted array', async () => {
            postsArr = [
                {
                    name: 'post 1',
                    commentsCount: 2
                },
                {
                    name: 'post 2',
                    commentsCount: 5
                }
            ];
            const controller = new Controller(data);
            const pArray =await controller.sortByNumberOfComments(postsArr, 'ASC');
    
            expect(pArray).to.exist;
            expect(pArray[0].name).to.equal(postsArr[0].name);
        });
    });
    // describe('getPostsBySubreadit', async () => {
    //     const object = {
    //         name : 'postName1',
    //         subreaditId: 1
    //     } 
    //     postsArr = [
    //         object  
    //     ];
    //     subreaditsArr = [{
    //         id: 1,
    //         name: 'sub1',
    //     }
        
    //     ];
    //     it('by subreaditName to subtract expect to return the posts wich has this subreaditName', async () => {
    //         const controller = new Controller(data);
    //         const subreaditName = 'sub1';
           
    //         const posts = await controller.getPostsBySubreadit(subreaditName);
    //         expect(posts).to.exist;

    //         //expect(posts.subreaditId).to.equal(subreadits.id);

    //     });
    // });
    // describe('getCreateData', () => {
    //     it('when no tags and subreadits, expect empty array', async () => {
    //         subreaditsArr = [];
    //         tagsArr = [];
    //         const controller = new Controller(data);
    //         const [tags, subreadits] = await controller.getCreateData();
    //         expect(tags).to.be.null;
    //         expect(subreadits).to.be.null;
    //     });
    // });
});
