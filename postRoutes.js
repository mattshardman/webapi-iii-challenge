const express = require('express');
const routes = express.Router();

const db = require('./data/helpers/postDb');

routes.get('/api/posts', async (req, res, next) => {
    try {
        const posts = await db.get();
        res.status(200).json(posts);
    } catch (e) {
        next({ status: 500, message: 'There was an error loading posts' });
    }
});

routes.get('/api/posts/:id', async (req, res, next) => {
    try {
        const post = await db.getById(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        next({ status: 500, message: `Post id ${req.params.id} could not be found` });
    }
});

routes.post('/api/posts', async (req, res, next) => {
    if (!req.body.text || !req.body.user_id) {
        next({ status: 400, message: 'Post must have text and a user id' });
    }

    try {
        const post = await db.insert(req.body);
        res.status(201).json(post);
    } catch (e) {
        next({ status: 500, message: 'Post could not be saved' });
    }
});

routes.put('/api/posts/:id', async (req, res, next) => {
    if (!req.body.text) {
        next({ status: 400, message: 'Post must have text' });
    }

    try {
        await db.update(req.params.id, req.body);
        const post = await db.getById(req.params.id);
        res.status(201).json(post);
    } catch (e) {
        next({ status: 500, message: 'Post could not be updated' });
    }
});

routes.delete('/api/posts/:id', async (req, res, next) => {
    try {
        const post = await db.getById(req.params.id);
        await db.remove(post.id);
        res.status(201).json(post);
    } catch (e) {
        next({ status: 500, message: 'Post could not be removed' });
    }
});

module.exports = routes;
