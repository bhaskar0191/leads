import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6"
import { FaUserPlus } from "react-icons/fa";


const Search = ({ setActiveComponent, setSelectedLeadId, filter }) => {
 const { search, status, source, sort } = filter;
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const getLeads = async () => {
    
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/leads/query/filter", {
          params: { search, status, source, sort},
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true, // if your backend uses cookies/auth
        });
        setLeads(res.data.leads);
       
      } catch (err) {
        console.error(err);
      }
    };
    const timeout = setTimeout(() => {
       getLeads();
    }, 500);
    return () => clearTimeout(timeout);
  }, [search, status, source, sort]);

  const deleteLead = async (id) => {
      try {
           const token = localStorage.getItem("token");
           const response = await axios.delete(`http://localhost:5000/leads/delete/${id}`, {
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

export default Search