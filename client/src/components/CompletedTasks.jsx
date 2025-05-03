import axios from "axios";
import { CheckCircle, Circle, Edit, Flag, MoreHorizontal, MoreVertical, Trash } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner";
import priorities from "@/constants/priorities";
import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function CompletedTasks({ tasks, projectId }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const token = localStorage.getItem('token');

    const updateTaskPriority = async (id, priority) => {
        try {
            const response = await axios.post(`${SERVER_URL}/api/project/task/update-task-priority/${id}`, {
                priority: priority
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    const handleDeleteTask = async (id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/project/task/delete-task/${id}/${projectId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
        }
    }




    return (
        <div className="w-full p-5 rounded-lg border border-neutral-200 bg-white shadow-xs">
            <div className="w-full flex items-center justify-between">
                <div className="px-4 py-2 rounded-md bg-green-200 text-xs flex items-center justify-center gap-1 cursor-pointer">
                    <CheckCircle size={15} className="text-green-600" />
                    <span className="text-green-600">Completed</span>
                </div>
                <div>
                    <MoreVertical size={15} />
                </div>
            </div>
            <div className="mt-5 w-full">
                <div className="w-full grid grid-cols-[repeat(4,_2fr)_auto] items-center justify-start py-2 gap-5">
                    <h4 className="text-xs text-gray-500">Title</h4>
                    <h4 className="text-xs text-gray-500">Description</h4>
                    <h4 className="text-xs text-gray-500">Assignee</h4>
                    <h4 className="text-xs text-gray-500">Priority</h4>
                    <h4 className="flex items-center justify-center gap-5">
                    <span className='text-xs text-slate-800'>Date of Completion</span>
                    </h4>
                </div>
                {tasks.length > 0 ? tasks.map((task, index) => (

                    <div key={index} className="w-full grid grid-cols-[repeat(4,_2fr)_auto] items-center justify-start py-2 border-t gap-5">
                        <h4 className="text-xs text-black">{task.title}</h4>
                        <p className="text-xs text-black">{task.description}</p>

                        <div className='flex items-center justify-start'>
                            <img src="https://untitledui.com/images/avatars/lana-steiner" alt="" className='w-6 h-6 rounded-full border border-neutral-200' />
                            <img src="https://untitledui.com/images/avatars/phoenix-baker" alt="" className='w-6 h-6 rounded-full relative right-2.5' />
                            <img src="https://untitledui.com/images/avatars/noah-pierre" alt="" className='w-6 h-6 rounded-full relative right-5' />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="outline-none cursor-pointer">
                                <div>
                                    <Flag size={15} className={`${task.priority == 'Normal' ? "text-blue-500" : task.priority == 'High' ? "text-red-500" : "text-neutral-500"} cursor-pointer`} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className={`space-y-2`}>
                                {priorities.map((priority) => (
                                    <DropdownMenuItem className={"flex flex-col items-start justify-center gap-5"}>
                                        <div onClick={() => updateTaskPriority(task._id, priority.value)} key={priority.id} className="flex items-center justify-center gap-2 cursor-pointer">
                                            <Flag size={15} className={`${priority.color}`} />
                                            <span className="text-xs">{priority.label}</span>
                                        </div>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <div className="flex items-center justify-center gap-5">
                        <span className='text-xs text-slate-800'>{new Date(task.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric"
                            })}</span>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="outline-none cursor-pointer">
                                    <MoreHorizontal size={15} className="text-neutral-500 cursor-pointer" />

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`space-y-2`}>

                                    <DropdownMenuItem>
                                        <div onClick={() => handleDeleteTask(task._id)} className="flex items-center justify-center gap-2">
                                            <Trash size={15} className='text-red-500' />
                                            <span className='text-red-500 text-xs'>Delete Task</span>
                                        </div>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>

                )) : <div className="border-t border-neutral-200 flex items-center justify-center">
                <span className="text-xs mt-5">No Completed Tasks</span>
                </div>}
            </div>
        </div>
    )
}