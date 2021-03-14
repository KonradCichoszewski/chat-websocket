const express = require('express');
const router = express.Router();
const { Todos } = require('../models/todos');

router.get('/', async function(req, res, next) {
    const todos = await Todos.find();
    res.render('index', {title: 'Todos', todos: todos})
})

module.exports = router;