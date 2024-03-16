const express = require('express');
const { getPosts, getPost, addPost, editPost, deletePost } = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const ROLES = require('../constants/roles');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res) => {
    const { search, limit, page } = req.query;
    const {posts, lastPage} = await getPosts(search, limit, page);

    res.send({data: {lastPage, posts: posts.map(mapPost)}});
});

router.get('/:id', async (req, res) => {
    const post = await getPost(req.params.id);

    res.send({data: mapPost(post)});
});

router.post('/:id/comments', authenticated, async (req, res) => {
    const {content} = req.body;
    const newComment = await addComment(req.params.id, {
        content, 
        author: req.user.id
    });

    res.send({data: mapComment(newComment)});
});

router.delete('/:postId/comments/:commentId', authenticated, hasRole([ROLES.ADMIN, ROLES.MODERATOR]), async (req, res) => {
    const {postId, commentId} = req.params;
    await deleteComment(postId, commentId);

    res.send({error: null});
});

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const {title, content, imageUrl: image} = req.body;
    const newPost = await addPost({title, content, image});

    res.send({data: mapPost(newPost)});
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    const {title, content, imageUrl} = req.body;
    const updatedPost = await editPost(req.params.id, {title, content, imageUrl});

    res.send({data: mapPost(updatedPost)});
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
    await deletePost(req.params.id);

    res.send({error: null});
});

module.exports = router;
