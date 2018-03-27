const HomeController = require('./home.controller');
const data = require('../../data/data');
const controller = new HomeController(data);

const test = async () => {
    // const posts = await controller.getAllPosts();
    // const subreadits = await controller.getAllSubreadits();
    const getInfo = await controller.getPostsInfo('DESC');
    const sortedByComments = await controller.sortByNumberOfComments(getInfo.posts, 'DESC');
    // console.log(posts);
    // console.log('*'.repeat(20));
    // console.log(subreadits);
    console.log('*'.repeat(20));
    console.log(sortedByComments);
    // console.log(getInfo.posts);
    console.log('*'.repeat(20));
};

test();
