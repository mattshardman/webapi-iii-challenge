// code away!
const express = require('express');
const app = express();

const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

app.use(express.json());
app.use(userRoutes);
app.use(postRoutes);

const PORT = 5000;
app.listen(PORT);
