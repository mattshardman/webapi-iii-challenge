const express = require('express');
const routes = express.Router();

const db = require('./data/helpers/userDb');

routes.get('/api/users', async (req, res, next) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (e) {
        next({ status: 500, message: 'Users could not be found' });
    }
});

routes.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await db.getById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        next({ status: 500, message: `User ${req.params.id}could not be found` });
    }
});

routes.post('/api/users', async (req, res, next) => {
    if (!req.body.name) {
        next({ status: 400, message: 'User must have a name' });
    }

    try {
        const user = await db.insert(req.body);
        res.status(201).json(user);
    } catch (e) {
        next({ status: 500, message: 'Users could not be created' });
    }
});

routes.put('/api/users/:id', async (req, res, next) => {
    if (!req.body.name) {
        next({ status: 500, message: 'Users must have a name' });
    }

    try {
        await db.update(req.params.id, req.body);
        const user = await db.getById(req.params.id);
        res.status(201).json(user);
    } catch (e) {
        next({ status: 500, message: 'Users could not be updated' });
    }
});

routes.delete('/api/users/:id', async (req, res, next) => {
    try {
        const user = await db.getById(req.params.id);
        await db.remove(user.id);
        res.status(201).json(user);
    } catch (e) {
        next({ status: 500, message: 'Users could not be deleted' });
    }
});

routes.get('/api/user-posts/:id', async (req, res, next) => {
    try {
        const posts = await db.getUserPosts(req.params.id);
        res.status(200).json(posts);
    } catch (e) {
        next({ status: 500, message: 'Posts could not be found for this user' });
    }
});

module.exports = routes;
