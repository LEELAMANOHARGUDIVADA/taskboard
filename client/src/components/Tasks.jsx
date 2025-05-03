import CompletedTasks from "./CompletedTasks";
import OnProgressTasks from "./OnProgressTasks";
import PendingTasks from "./PendingTasks";

export default function Tasks({ project }) {
    return (
        <div className="w-full flex items-center justify-center">
            {project?.tasks.length > 0 ? (
                <div className="w-full flex flex-col items-center justify-center gap-5">
                    <PendingTasks tasks={project?.tasks.filter((task) => task.status === "Pending")} projectId={project._id} />
                    <OnProgressTasks tasks={project?.tasks.filter((task) => task.status === "OnProgress")} projectId={project._id} />
                    <CompletedTasks tasks={project?.tasks.filter((task) => task.status === "Completed")} projectId={project._id} />
                </div>
            ) : (
                <div>
                <span>You haven't created any tasks yet</span></div>
            )}
        </div>
    )
}