import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [
        {   
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Task'
        }
    ],
    user: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, { timestamps: true });

const Project = new mongoose.model('Project', projectSchema);

export default Project;