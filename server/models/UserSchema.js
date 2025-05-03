import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    projects: [
        {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: 'Project'
        }
    ]
},{ timestamps: true });

const User = new mongoose.model('User', userSchema);

export default User;