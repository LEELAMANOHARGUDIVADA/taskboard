import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import ProjectCard from '../components/ProjectCard'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/DashboardHeader';

const SERVER_URL = import.meta.env.VITE_API_URL;

const Dashboard = () => {
  const [projects, setProjects] = useState([]);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const getUserProjects = async() => {
    try {
      const response = await axios.get(`${SERVER_URL}/api/project/userProjects`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProjects(response.data.userProjects);
    } catch (error) {
      console.log(error.response?.data);
    }
  }

  useEffect(() => {
    if(!token){
      navigate('/login');
    } else{
      getUserProjects();
    }
  }, [token]);

  return (
    <div className='w-full flex items-center justify-center relative'>
      <div className="w-[25%] fixed top-0 left-0 p-2 border-r border-neutral-200 bg-white">
        <Sidebar />
      </div>
      <div className="w-[75%] ml-[25%]">
        <div className="fixed top-0 w-full p-2 shadow-xs z-20 border-b border-neutral-200">
        <DashboardHeader />
        </div>
        <div className='w-full mt-16 px-5'>
          <h4 className='text-lg font-bold'>My Projects</h4>
          <div className="w-full grid grid-cols-4 items-center justify-center gap-3 mt-5">
            {projects.length > 0 &&  projects.map((project, index) => (
              <ProjectCard project={project} key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard