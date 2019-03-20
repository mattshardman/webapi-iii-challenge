const express = require('express');
const routes = express.Router();

const db = require('./data/helpers/userDb');

routes.get('/api/users', async (req, res, next) => {
    try {
        const users = await db.get();
        res.status(200).json(users);
    } catch (e) {
        next();
    }
});

routes.get('/api/users/:id', async (req, res, next) => {
    try {
        const user = await db.getById(req.params.id);
        res.status(200).json(user);
    } catch (e) {
        next();
    }
});

routes.post('/api/users', async (req, res, next) => {
    // if (!req.body.name) {
    //     next();
    // }
    try {
        const user = await db.insert(req.body);
        res.status(201).json(user);
    } catch (e) {
        next();
    }
});

module.exports = routes;
