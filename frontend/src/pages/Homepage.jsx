import React, { useState } from 'react'
import Login from '../components/Login.jsx'
import Register from '../components/Register.jsx'
import Navbar from '../components/Navbar.jsx'
import AllLeads from '../components/AllLeads.jsx'
import UpdateLeads from '../components/UpdateLeads.jsx'
import Search from '../components/Search.jsx'

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeComponent, setActiveComponent] = useState("home")
  const [selectedLeadId, setSelectedLeadId] = useState(null); 
  const [lead, setLead] = useState(null);
  const [filter, setFilter] = useState({
    search: "",
    status: "",
    source: "",
    sort: "newest",
  });
  return (
    <>
       <Navbar 
         isLoggedIn = {isLoggedIn}
         lead = {lead}
         setIsLoggedIn = {setIsLoggedIn}
         setActiveComponent= {setActiveComponent}
         setFilter={setFilter}
        />
      <div className='h-full flex flex-col items-center justify-content mt-10'>
        {activeComponent === "home" && (
            <h2 className='text-2xl text-bold'> Welcome to the Homepage</h2>
        )}
        {activeComponent === "register" && (
          <Register setIsLoggedIn={setIsLoggedIn} 
          setActiveComponent={setActiveComponent} />
        )}
        {activeComponent === "login" && (
          <Login 
            setIsLoggedIn={setIsLoggedIn}
            setLead={setLead} 
            setActiveComponent={setActiveComponent} />
        )}
        {activeComponent === 'allleads' && (
           <AllLeads  setActiveComponent={setActiveComponent}
            setSelectedLeadId={setSelectedLeadId} />
          )}
        {activeComponent === 'update' && (
          <UpdateLeads  id={selectedLeadId} 
          setActiveComponent={setActiveComponent} />
        )}
        {activeComponent === 'search' && (
          <Search 
          setActiveComponent={setActiveComponent} 
          setSelectedLeadId={setSelectedLeadId}
          filter={filter}
        />
        )}
      </div>
    </>
  
  )
}

export default Homepage