// code away!
const express = require('express');
const app = express();

const error = require('./errormiddleware');
const name = require('./namemiddleware');
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');


app.use(express.json());
app.use(name)
app.use(userRoutes);
app.use(postRoutes);
app.use(error);

const PORT = 5000;
app.listen(PORT);
