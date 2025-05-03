import { BookText, MoreVertical, Trash } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';
import { toast } from 'sonner';

const SERVER_URL = import.meta.env.VITE_API_URL;

const ProjectCard = ({ project }) => {
    const [progress, setProgress] = useState(0);
    const token = localStorage.getItem("token");

    const handleDeleteProject = async(id) => {
        try {
            const response = await axios.delete(`${SERVER_URL}/api/project/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success(response.data.message);
            setTimeout(() =>{
                window.location.reload();
            },1000)
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    useEffect(() => {
        const completedTasks = project.tasks.filter((task) => task.status == "Completed").length;
        const progress = (completedTasks/project.tasks.length)*100;
        if(progress){
            setProgress(Math.round(progress));
        }
    }, [])
    return (
        <div className='h-46 w-full bg-white shadow-xs cursor-pointer border border-neutral-200 rounded-xl overflow-hidden'>
            <Link to={`/project/${project._id}`}>
                <div className="p-2.5">
                    <h4 className='text-sm font-semibold'>{project?.name}</h4>
                    <p className='h-12 text-xs text-gray-500 overflow-hidden'>{project?.description}</p>
                    <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center justify-center gap-1 mt-2">
                            <BookText size={18} className='text-slate-800' />
                            <span className='text-xs text-slate-800'>{new Date(project.createdAt).toLocaleDateString("en-GB", {
                                day: "2-digit",
                                month: "short",
                            })}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 bg-white border border-neutral-200 px-2 py-1 rounded-lg shadow-xs">
                            <div className="w-5 h-5">
                                <svg className="transform " viewBox="0 0 36 36">
                                    <path
                                        className="text-neutral-200"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        fill="none"
                                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                                    />
                                    <path
                                        className={`${progress >= 25 && progress < 75 ? "text-yellow-500" : progress >= 75 && progress ? "text-green-600" : "text-gray-500"}`}
                                        stroke="currentColor"
                                        strokeWidth="4"
                                        strokeDasharray="100"
                                        strokeDashoffset={`${100 - progress}`}
                                        fill="none"
                                        d="M18 2a16 16 0 1 1 0 32 16 16 0 1 1 0-32"
                                    />
                                </svg>
                            </div>
                            <span className="text-xs text-gray-500">{progress}%</span>
                        </div>

                    </div>
                </div>
            </Link>

            <div className='flex items-center justify-between p-2.5 border-t border-neutral-100'>
                <div className='flex items-center justify-center'>
                    <img src="https://untitledui.com/images/avatars/lana-steiner" alt="" className='w-7 rounded-full border border-neutral-200' />
                    <img src="https://untitledui.com/images/avatars/phoenix-baker" alt="" className='w-7 rounded-full relative right-2' />
                    <img src="https://untitledui.com/images/avatars/noah-pierre" alt="" className='w-7 rounded-full relative right-4' />
                </div>
                <div>
                    <DropdownMenu >
                        <DropdownMenuTrigger className="outline-none cursor-pointer">
                    <MoreVertical size={18} className='text-gray-500' />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>
                                <div onClick={() => handleDeleteProject(project._id)} className="flex items-center justify-center gap-2">
                                    <Trash size={15} className='text-red-500' />
                                    <span className='text-red-500 text-xs'>Delete Project</span>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;