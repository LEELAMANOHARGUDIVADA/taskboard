import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../components/Sidebar';
import DashboardHeader from '@/components/DashboardHeader';
import { Folder, Plus } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Tasks from '@/components/Tasks';
import { toast } from 'sonner';


const SERVER_URL = import.meta.env.VITE_API_URL;

const Project = () => {
  const [project, setProject] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchProject = async () => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setProject(response.data.project);
    } catch (error) {
      console.log(error?.response.data);
    }
  }

  const addTask = async(e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/api/project/task/create-task`,{
        projectId: id,
        title: title,
        description: description,
        status: "Pending"
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000)
    } catch (error) {
      toast.error(error.response.data);
      setTitle('');
      setDescription('');
    }
  }
  useEffect(() => {
      if(!token){
        navigate('/login');
      } else{
        fetchProject();
      }
    }, [token]);
  return (
    <div className='w-full flex items-center justify-center'>
      <div className="w-[25%] fixed top-0 left-0 p-2 border-r border-neutral-200">
        <Sidebar />
      </div>
      <div className="w-[75%] h-screen ml-[25%]">
        <div className="fixed top-0 w-full p-2 shadow-xs z-10 bg-white border-b border-neutral-200">
          <DashboardHeader />
        </div>
        <div className='mt-16 px-5'>
          <div className="w-full flex items-center justify-between">
            <div className='flex items-center justify-start gap-2 cursor-pointer'>
              <Folder size={18} className='text-neutral-500' />
              <h3 className='font-extrabold text-sm'>{project?.name}</h3>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className='flex items-center justify-center border-r'>
                <img src="https://untitledui.com/images/avatars/lana-steiner" alt="" className='w-6 h-6 rounded-full border border-neutral-200' />
                <img src="https://untitledui.com/images/avatars/phoenix-baker" alt="" className='w-6 h-6 rounded-full relative right-2.5' />
                <img src="https://untitledui.com/images/avatars/noah-pierre" alt="" className='w-6 h-6 rounded-full relative right-5' />
              </div>
              <Dialog>
                <DialogTrigger>
                <div className='bg-black text-white p-2 text-xs rounded-lg cursor-pointer flex items-center justify-center gap-2'>
                <Plus size={15} />
                <h4>
                  Add New
                </h4>
              </div>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Task</DialogTitle>
                  </DialogHeader>
                  <div className='mt-5'>
                  <form onSubmit={addTask} className='w-full flex flex-col items-center justify-center gap-5'>
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
                    <button type="submit" className='w-full px-4 py-3 text-xs rounded-lg bg-black text-white cursor-pointer'>
                      Add Task
                    </button>
                  </form>
                </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="mt-8">
            <Tasks project={project} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Project