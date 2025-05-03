import dotenv from "dotenv"
dotenv.config();
import express from "express"
import cors from "cors"
import userRoutes from "./routes/UserRoutes.js"
import projectRoutes from "./routes/ProjectRoutes.js"
import taskRoutes from "./routes/TaskRoutes.js"
import connectDB from "./db/db.js";

const app = express();

app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use('/api/auth', userRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/project/task', taskRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    connectDB(process.env.MONGODB_URI);
    console.log("SERVER RUNNING ON PORT", PORT);
});