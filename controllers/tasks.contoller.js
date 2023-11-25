const Task = require('../models/task.model');
const customError = require('../utils/error');

const getALlTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json(tasks);
    } catch (err) {
        next(err);
    }
};

const getTaskById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        if (!task) return next(customError(404, 'task not found'));
        res.status(200).json(task);
    } catch (err) {
        next(customError(404, "task not found"));
    }

};

const createTask = async (req, res, next) => {
    const { title, description } = req.body;
    try {

        if (!title || !description) return next(
            customError(405, "invalid input. title and description required")
        );

        const task = new Task({
            title,
            description
        });
        await task.save();
        return res.status(201).json(task);

    } catch (err) {
        next(customError(500, err.message));
    }

};

const updateTaskById = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, {
            title,
            description,
            status
        }, {
            new: true
        });

        return res.status(200).json(updatedTask);

    } catch (err) {
        next(customError(400, 'invalid Id'));
    }
};

const deleteTaskById = async (req, res, next) => {
    const { id } = req.params;
    try {
        await Task.deleteOne({ _id: id });
        return res.status(200).json({
            message: "task deleted successfully",
        });
    } catch (err) {
        next(customError(400, 'invalid Id'));
    }
};

module.exports = {
    getALlTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
};