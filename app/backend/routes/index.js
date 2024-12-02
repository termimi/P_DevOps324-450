const express = require('express');
const app = express();
const userApi = require('./user.api');
const authApi = require('./auth.api');
const todoApi = require('./todo.api');


app.use(express.json());

app.use('/api/user', userApi);
app.use('/api/auth', authApi);
app.use('/api/todo', todoApi);

module.exports = app; 
