import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa6";

const UpdateLeads = ({ id, setActiveComponent }) => {
  
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name:  '',
    email: '',
    password:'',
    status: '',
    source: ''
  })
  const changeHeandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() =>{
   const fetchLead = async() => {
    try {
        const token = localStorage.getItem("token")
        console.log("Token being sent:", token)
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/leads/${id}`,{
            headers: {Authorization: `Bearer ${token}`}
        })
        console.log(res.data)
        setFormData({
            name: res.data.lead.name || '',
            email: res.data.lead.email || '',
            password: "",
            status: res.data.lead.status || '',
            source: res.data.lead.source || ''  
       })
    }catch(err){
        console.error("Error fatching lead", err)
    }
   };
   fetchLead()
  },[id]);

  const onSubmitHandler = async(e) =>{
    e.preventDefault();
      try{
        const token = localStorage.getItem("token")
       const res = await axios.put(`http://localhost:5000/leads/update/${id}`, formData, {
        headers: {Authorization: `Bearer ${token}`}
       })
      console.log("Lead updated Successfully.", res.data)
      alert("Lead updated Successfully.");
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
    <h2 className="text-2xl font-bold text-center mb-6">Update Leads</h2>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
        <select 
          name='source'
          value={formData.source}
          onChange={changeHeandler}
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
        >
          <option value="website">Website</option>
          <option value="instagram">Instagram</option>
          <option value="referral">Referral</option>
        </select>
      </div>
      <button 
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold rounded-md p-3 hover:bg-blue-700 transition-colors"
      >
        Update
      </button>
    </form>
  </div>
</div>

  )
}

export default UpdateLeads