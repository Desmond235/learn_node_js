const Task = require('../modules/task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom_error')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });
})

const getTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).json({ task });
    console.log('task found');
}
)



const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params
    const task = await Task.findOneAndDelete({ _id: taskID });

    if (!task) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).json({ task });
}
)
const UpdateTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
        
    });
    if (!task) {
        return next(createCustomError(`No task found with id ${taskID}`, 404))
    }
    res.status(200).json({ task })

})





module.exports = {
    getAllTasks,
    createTask,
    getTask,
    UpdateTask,
    deleteTask,
}