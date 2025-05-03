import Project from "../models/ProjectSchema.js";
import Task from "../models/TaskSchema.js";

const createTask = async(req,res) => {
    try {
        const { projectId, title, description, status } = req.body;

        if(!projectId || !title || !description || !status ){
            throw new Error("All Fields Are Required!");
        }

        const project = await Project.findById(projectId);
        if(!project){
            return res.status(404).json({ success: false, message: "Project Not Found!" });
        }

        const task = new Task({
            projectId,
            title,
            description,
            status
        });
        await task.save();

        await Project.findByIdAndUpdate(projectId, {
            $push: {
                tasks: task
            }
        });

        return res.status(201).json({ success: true, message: "Task Added!" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const readTask = async(req,res) => {
    try {
        
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateTask = async(req,res) => {
    try {
        const {id} = req.params;

        const task = await Task.findByIdAndUpdate(id, req.body);

        if (!task) {
            return res.status(404).json({message: "Task Not Found"});
        }
        await task.save();

        return res.status(200).json({success: true, message: "Task Updated!"});

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteTask = async(req,res) => {
    try {
        const { id, projectId } = req.params;

        if(!id){
            return res.status(400).json({ success: false, message: "Invalid Id" });
        }

        const task = await Task.findByIdAndDelete(id);

        if(!task){
            return res.status(400).json({ success: false, message: "No Task Found" });
        }
        const updateProject = await Project.findByIdAndUpdate(projectId, {
            $pull: {
                tasks: id
            }
        });
        await updateProject.save();
        return res.status(200).json({ success: true, message: "Task Deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateTaskPriority = async(req,res) => {
    try {
        const {id} = req.params;
        const { priority } = req.body;

        if(!priority){
            throw new Error("All Fields Are Required");
        }

        const task = await Task.findByIdAndUpdate(id, {
            priority: priority
        });

        await task.save();

        return res.status(200).json({ success: true, message: "Task Priority Updated" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { createTask, readTask, updateTask, deleteTask, updateTaskPriority }