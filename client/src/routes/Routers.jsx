import React from 'react'
import { Routes, Route } from "react-router-dom"
import Register from '../pages/Register'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'

const Routers = () => {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<Dashboard />} />
        <Route path='/project/:id' element={<Project />} />
    </Routes>
  )
}

export default Routers