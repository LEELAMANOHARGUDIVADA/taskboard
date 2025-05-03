import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'Project'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        default: "Pending"
    },
    completedAt: {
        type: Date
    }
}, { timestamps: true });

const Task = new mongoose.model('Task', taskSchema);

export default Task;