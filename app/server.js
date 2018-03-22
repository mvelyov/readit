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

// app.get('/:category', (req, res) => {
//     const category = req.params.category;
//     const listCategory = data.getCategory(category);
//     const model = {
//         listCategory,
//     };

//     res.render('category', model);
// });

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
    res.render('create/post');//, model);
});

app.post('/home', async (req, res) => {
    const post = req.body;
    post.userId = +post.userId;
    post.subreaditId = +post.subreaditId;
    console.log(post);
    post.tags = [1, 2, 3];
    await controller.createPost(post);
    res.redirect('/home');
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
