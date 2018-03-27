const SubreaditsController = require('./subreadits.controller');
const data = require('../../data/data');
const controller = new SubreaditsController(data);

const test = async () => {
    const posts = await controller.getPostsBySubreadit('Avengers');
    console.log(posts);
}

test();