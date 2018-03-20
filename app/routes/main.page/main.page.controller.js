const {
    db,
} = require('../../db/models');

const {
    comment,
    post,
    tag,
    user,
} = db;

// class MainPageController {
//     constructor(data) {
//         this.data = data;
//     }

// }

const run = async () => {
    const posts = await post.findById(1);
    console.log(posts);
};

run();

// module.exports = MainPageController;