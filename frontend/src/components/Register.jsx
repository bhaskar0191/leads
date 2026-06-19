import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const Register = ({setIsLoggedIn, setActiveComponent}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email:'',
    password:'',
    status:'',
    soruce:''
  })

  const changeHeandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
      try{
       const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, formData)
        console.log("Lead register Successfully.", res.data)
        alert("Lead register Successfully.");
        setActiveComponent("allleads");
      }
      catch(err) {
        console.error("server error.", err)  
      }
  }
  return (
    <div className="h-full flex items-center justify-center bg-gray-100">
  <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
    <button onClick={() => setActiveComponent("allleads") } 
    className="mb-4 text-sm text-blue-500 hover:underline flex items-center gap-1">
      <FaArrowLeft /> Back
    </button>
    <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
    <form className="space-y-4" onSubmit={onSubmitHandler}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input 
          name='name'
          value={formData.name}
          onChange={changeHeandler}
          type="text" 
          placeholder="Enter your name"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input 
          name='email'
          value={formData.email}
          onChange={changeHeandler}
          type="email" 
          placeholder="Enter your email"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
        <input
          name='password'
          value={formData.password}
          onChange={changeHeandler} 
          type="password" 
          placeholder="Enter your password"
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
        <select 
          name='status'
          value={formData.status}
          onChange={changeHeandler}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        >
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="qualified">Qualified</option>
          <option value="lost">Lost</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Soruce</label>
        <select 
          name='soruce'
          value={formData.soruce}
          onChange={changeHeandler}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        >
          <option value="website">Website</option>
          <option value="instargram">Instagram</option>
          <option value="referral">Referral</option>
        </select>
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold rounded-md p-3 hover:bg-blue-700 transition-colors"
      >
        Register
      </button>
    </form>
    <p className="text-sm text-gray-600 mt-4">
      Already have an account? <button onClick={() => setActiveComponent("login")} className="text-blue-500 hover:underline">Login here</button>
    </p>
  </div>
</div>

  )
}

export default Register