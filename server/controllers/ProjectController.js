import Project from "../models/ProjectSchema.js";
import User from "../models/UserSchema.js";

const createProject = async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name || !description || !req.user) {
            throw new Error("All Fields Are Required!");
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "User Not Found!" });
        }

        if (user.projects.length >= 4) {
            return res.status(400).json({ success: false, message: "Organization has maximum of 4 projects!" });
        }

        const project = new Project({
            name,
            description,
            user: req.user.id
        });
        await project.save();

        await User.findByIdAndUpdate(req.user.id, {
            $push: {
                projects: project,
            },
        });

        return res.status(201).json({ success: true, message: "New Project Created!" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getUserProjects = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(404).json({ success: false, message: "User Not Found" });
        }

        const user = await User.findById(req.user.id)
            .populate({
                path: "projects",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "tasks",
                    model: "Task",
                },
            });


        if (!user.projects) {
            return res.status(400).json({ success: false, message: "No Projects Found" });
        }

        return res.status(200).json({ success: true, message: "Projects Fetched", userProjects: user.projects });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const getProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        }

        const project = await Project.findById(id).populate("tasks");

        if (!project) {
            return res.status(400).json({ success: false, message: "No Project Found" });
        }
        return res.status(200).json({ success: true, message: "Project Fetched", project });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const deleteProject = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: "Invalid Id" });
        }

        const project = await Project.findByIdAndDelete(id);

        if (!project) {
            return res.status(400).json({ success: false, message: "No Project Found" });
        }
        const updateUser = await User.findByIdAndUpdate(req.user.id, {
            $pull: {
                projects: id
            }
        });
        await updateUser.save();
        return res.status(200).json({ success: true, message: "Project Deleted" });
    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export { createProject, getUserProjects, getProject, deleteProject };