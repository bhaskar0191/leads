import axios from 'axios'
import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'

const Login = ({ setIsLoggedIn, setActiveComponent ,setLead}) => {


  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password:""
  })
   const onchangeHandler = (e) => {
     setFormData({...formData, [e.target.name]: e.target.value})

   }
   const onSubmitHandler = async(e) => {
      e.preventDefault();
      try{
        const res = await axios.post("http://localhost:5000/leads/login", formData)
        localStorage.setItem("token", res.data.token);
        setIsLoggedIn(true);
        setLead(res.data.lead);
        setActiveComponent("allleads");
      }catch(err){
        console.error("server erroe", err)
      }
   }
  return (
    <div className="h-full flex items-center justify-center bg-gray-100 " >
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
             <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
             <form className="space-y-4" onSubmit={onSubmitHandler}>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input 
                        name='email'
                        value={formData.email}
                        onChange={onchangeHandler}
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
                      onChange={onchangeHandler} 
                       type="password" 
                       placeholder="Enter your password"
                      className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                />
                </div>
                 <button 
                     type="submit"
                    className="w-full bg-blue-600 text-white font-semibold rounded-md p-3 hover:bg-blue-700 transition-colors"
                 >
                Login
              </button>
           </form>
           <p className="text-sm text-gray-600 mt-4">
             Don't have an account? <button onClick={() => setActiveComponent("register")} className="text-blue-500 hover:underline">Register here</button>
           </p>
         </div>
    </div>
  )
}

export default Login