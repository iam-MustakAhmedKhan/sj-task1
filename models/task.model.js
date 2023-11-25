const { Schema, model } = require('mongoose');

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'incomplete'
    }
}, {
    timestamps: true
});

const Task = model('Task', taskSchema);

module.exports = Task;