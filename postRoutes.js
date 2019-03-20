const express = require('express');
const routes = express.Router();

const db = require('./data/helpers/postDb');

routes.get('/api/posts', async (req, res, next) => {
    try {
        const posts = await db.get();
        res.status(200).json(posts);
    } catch (e) {
        next();
    }
});

routes.get('/api/posts/:id', async (req, res, next) => {
    try {
        const post = await db.getById(req.params.id);
        res.status(200).json(post);
    } catch (e) {
        next();
    }
});

routes.post('/api/posts', async (req, res, next) => {
    if (!req.body.text || !req.body.user_id) {
        next();
    }

    try {
        const post = await db.insert(req.body);
        res.status(201).json(post);
    } catch (e) {
        next();
    }
});

routes.put('/api/posts/:id', async (req, res, next) => {
    if (!req.body.text) {
        next();
    }

    try {
        await db.update(req.params.id, req.body);
        const post = await db.getById(req.params.id);
        res.status(201).json(post);
    } catch (e) {
        next();
    }
});

routes.delete('/api/posts/:id', async (req, res, next) => {
    try {
        const post = await db.getById(req.params.id);
        await db.remove(post.id);
        res.status(201).json(post);
    } catch (e) {
        next();
    }
});

module.exports = routes;
