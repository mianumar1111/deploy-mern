const mongoose = require('mongoose'); // Corrected 'mongooose' to 'mongoose'

const TodoSchema = new mongoose.Schema({
    task: String,
    status:{
        type:Boolean,
        default:false
    }
});

const todoModel = mongoose.model('todos', TodoSchema);

module.exports = todoModel;
