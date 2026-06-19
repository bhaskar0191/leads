import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6"
import { FaUserPlus } from "react-icons/fa";
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

const AllLeads = ({setSelectedLeadId , setActiveComponent}) => {

    const navigate = useNavigate()
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const getleads = async () => {
            try{
              const token = localStorage.getItem("token")
              const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/all`, {
                headers: {Authorization: `Bearer ${token}`},
              })
              setLeads(response.data)
              if (Array.isArray(response.data)) {
                setLeads(response.data);
              } else if (Array.isArray(response.data.leads)) {
                setLeads(response.data.leads);
              } else {
                setLeads([]); // fallback
              }

            }catch(err){
                console.log("error fitching data", err)
            };
            
        }
        const timeout = setTimeout(() => {
           getleads();
        }, 500);
        return () => clearTimeout(timeout);
    }, [navigate])

    const deleteLead = async (id) => {
      try {
           const token = localStorage.getItem("token");
           const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/delete/${id}`, {
           headers: { Authorization: `Bearer ${token}` },
       });

       if (response.data.success) {
          setLeads(leads.filter((lead) => lead._id !== id));
          alert(response.data.message);
        }else {
        alert(response.data.message);
        }
      } catch (err) {
          console.error("Error deleting lead", err);
      }
    }  
  return (
    <div className=' flex flex-col'>
        <div className=' gap-1'>
             <button 
              onClick={() => setActiveComponent("register")}
               className='w-40 border-2 rounded  bg-gray-500 text-white font-bold text-2xl align-top mb-4 mt-7 border-black'> 
                Add Lead <FaUserPlus/>
            </button>

        </div>
       
        <table className=''>
            <thead >
                <tr className=' grid grid-cols-6  border '>
                    <th className='border w-20'>S.No</th>
                    <th className='border' >Name</th>
                    <th className='border'>Email</th>
                    <th className='border'>Status</th>
                    <th className='border'>Source</th>
                    <th className='border'>Actions</th>
                </tr>
            </thead>
            <tbody>
                {leads.map ((lead, index) => (
    
                  <tr key={lead._id} className='grid grid-cols-6  border  text-gray-400'>
                      <td className='border'>{index+1}</td>
                      <td  className='border'>{lead.name}</td>
                      <td className='border'>{lead.email}</td>
                      <td className='border'>{lead.status}</td>
                      <td className='border'>{lead.source}</td>
                      <td>
                          <button 
                            onClick={() => {
                              setSelectedLeadId(lead._id);
                                setActiveComponent("update");
                            }}
                            className='text-blue-600 h-3.5 mr-3'
                          >
                            <FaPenToSquare />
                          </button>
                          <button 
                             onClick={() => deleteLead(lead._id)}
                            className='text-red-700 ml-2 h-3.5'
                          >
                            <FaTrash/>
                          </button>
                       </td>
                    </tr>
                ))}
                
            </tbody>
        </table>
    </div>
  )
}

export default AllLeads