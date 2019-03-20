// code away!
const express = require('express');
const app = express();

const userRoutes = require('./userRoutes');

app.use(express.json(), userRoutes);

const PORT = 5000;
app.listen(PORT);