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

app.use('/static', express.static(path.join(__dirname, '../public')));
console.log(path.join(__dirname, '../public'));
app.set('view engine', 'pug');

app.get('/home', async (req, res) => {
    const postsLists = await controller.getAllPosts();
    const model = {
        postsLists,
    };
    res.render('home', model);
});

app.post('/home', async (req, res) => {
    const post = req.body;
    if (!post.image) {
        delete post.image;
    }
    post.subreaditId = +post.subreaditId;
    post.tags = [+post.tags];
    // console.log(post);
    await controller.createPost(post);
    res.redirect('/home');
});

app.get('/content/:id', async (req, res) => {
    const id = req.params.id;
    const post = await controller.getInfo(+id);
    // const post = getpost[0];
     const comentars = post.comments;
     const tags = post.tags;
     const model = {
        // post,
        comentars,
        post,
        tags,
        id,
    };
    res.render('content', model);
});

app.get('/create/post', (req, res) => {
    // const model ={};
    res.render('create/post');// , model);
});

app.post('/content/:id', async (req, res) => {
    // const id = req.params.id;
    const coment = req.body;
    coment.postId = +coment.postId;
    coment.userId = +coment.userId;
    const id = coment.postId;
    await controller.createNewComment(coment);
    // const getpost = data.getPost(id);
    // const post = getpost[0];
    // const comentars = getpost[1];
    // const model = {
    //     post,
    //     comentars,
    // };
    // res.render('content', model);
    res.redirect('/content/'+id);
});

app.get('/home/:category', async (req, res) => {
    const category = req.params.category;
    const listCategory = await controller.getPostsBySubreadit(category);
    const model = {
        listCategory,
        // name: category,
    };
    // console.log('______________________________________');
    // console.log(category);
    // console.log('______________________________________');
    res.render('category', model);
});

app.listen(3001);
