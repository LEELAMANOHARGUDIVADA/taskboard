import axios from "axios";
import { Check, CheckCircle, Circle, Edit, Flag, MoreHorizontal, MoreVertical, Trash } from "lucide-react";
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
import { RiProgress4Line } from "react-icons/ri";

const SERVER_URL = import.meta.env.VITE_API_URL;

export default function PendingTasks({ tasks, projectId }) {
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

    const handleUpdateTask = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${SERVER_URL}/api/project/task/update-task/${id}`, {
                title,
                description
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTitle('');
            setDescription('');
            toast.success(response.data.message);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        } catch (error) {
            console.log(error.response.data.message);
            toast.error(error.response.data.message);
            setTitle('');
            setDescription('');
        }
    }
    const handleUpdateStatus = async (e, id) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${SERVER_URL}/api/project/task/update-task/${id}`, {
                status: "OnProgress"
            }, {
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
            setTitle('');
            setDescription('');
        }
    }

    const setTaskData = (task) => {
        setTitle(task.title);
        setDescription(task.description);
    }
    return (
        <div className="w-full p-5 rounded-lg border border-neutral-200 bg-white shadow-xs">
            <div className="w-full flex items-center justify-between">
                <div className="px-4 py-2 rounded-md bg-gray-200 text-xs flex items-center justify-center gap-1 cursor-pointer">
                    <Circle size={15} />
                    <span>Pending</span>
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
                        <Edit size={15} className="invisible" />
                        <MoreHorizontal size={15} className="invisible" />
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
                            <Dialog>
                                <DialogTrigger>
                                    <Edit onClick={() => setTaskData(task)} size={15} className="text-neutral-500 cursor-pointer" />
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Update Task</DialogTitle>
                                    </DialogHeader>
                                    <div className='mt-5'>
                                        <form onSubmit={(e) => handleUpdateTask(e, task._id)} className='w-full flex flex-col items-center justify-center gap-5'>
                                            <input type="text"
                                                className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                                                placeholder='Title'
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                required
                                            />
                                            <input type="text"
                                                className='w-full text-black py-2 px-5 border border-neutral-200 rounded-lg outline-black text-sm'
                                                placeholder='Description'
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                                required
                                            />
                                            <button type="submit" className='w-full px-4 py-2 rounded-lg bg-black text-white cursor-pointer'>
                                                Update Task
                                            </button>
                                        </form>
                                    </div>
                                </DialogContent>
                            </Dialog>

                            <DropdownMenu>
                                <DropdownMenuTrigger className="outline-none cursor-pointer">
                                    <MoreHorizontal size={15} className="text-neutral-500 cursor-pointer" />

                                </DropdownMenuTrigger>
                                <DropdownMenuContent className={`space-y-2`}>
                                    <DropdownMenuItem>
                                        <div onClick={(e) => handleUpdateStatus(e, task._id)} className="flex items-center justify-center gap-2">
                                            <RiProgress4Line size={15} className='text-yellow-500' />
                                            <span className='text-yellow-500 text-xs'>Mark as OnProgress</span>
                                        </div>
                                    </DropdownMenuItem>

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
                    <span className="text-xs mt-5">No Pending Tasks</span>
                    </div>}
            </div>
        </div>
    )
}