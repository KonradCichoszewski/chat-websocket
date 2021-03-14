const mongoose = require('mongoose');

const todosSchema = new mongoose.Schema({
    description: String,
    complete: Boolean
});

module.exports.Todos = mongoose.model('Todos', todosSchema);