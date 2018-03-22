const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const data = require('./data');
const ReadItController = require('./routes/controller/readit.controller');

const app = express();
const controller = new ReadItController(data);

app.use(bodyParser.urlencoded({
    extended: true,
}));

app.set('view engine', 'pug');

app.get('/home', async (req, res) => {
    const postsLists = await controller.getAllPosts();
    const model = {
        postsLists,
    };
    res.render('home', model);
});

// app.get('/content/:id', (req, res) => {
//     const id = req.params.id;
//     const getpost = data.getPost(id);
//     const post = getpost[0];
//     const comentars = getpost[1];
//     const model = {
//         post,
//         comentars,
//     };
//     res.render('content', model);
// });

app.get('/create/post', (req, res) => {
    // const model ={};
    res.render('create/post'); //, model);
});

app.post('/home', async (req, res) => {
    const post = req.body;

    post.subreaditId = +post.subreaditId;
    post.tags = [+post.tags];
    // console.log(post);
    await controller.createPost(post);
    res.redirect('/home');


});

app.get('/home/:category', async (req, res) => {
    const {
        category,
    } = req.params;
    // console.log('----------------------');
    // console.log(obj);
    // console.log('----------------------');
    const listCategory = (await controller.getPostsBySubreadit(category)).map((item) => item.dataValues.content);
    // console.log('----------------------');
    // console.log(listCategory);
    // console.log('----------------------');
    const model = {
        listCategory,
    };

    res.render('category', model);
});

// app.post('/content/:id', (req, res) => {
//     //const id = req.params.id;
//     const coment = req.body;
//     const id = +coment.id;
//     data.createComentars(coment);
//     // const getpost = data.getPost(id);
//     // const post = getpost[0];
//     // const comentars = getpost[1];
//     // const model = {
//     //     post,
//     //     comentars,
//     // };
//     // res.render('content', model);
//     res.redirect('/content/'+id);
// });

app.listen(3001);
