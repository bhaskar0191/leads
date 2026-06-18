import React,{useState} from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout.jsx"
import axios from "axios";

const Navbar = ({isLoggedIn, lead, setActiveComponent, setIsLoggedIn, setFilter}) => {

  const [searchTerm, setSearchTerm] =useState("");
  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("newest");

  const handleSearch =  () => {
    setFilter({ search: searchTerm, status, source, sort });
    setActiveComponent("search");
  }
  return (
    <>
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white cursor-pointer">
      <span 
        onClick={() => setActiveComponent("home")}  
        className="font-bold text-2xl"
      > 
        MyApp
      </span>
       <div >
        {!isLoggedIn ? (
          <div className="flex items-center gap-4 cursor-pointer">
             <button onClick={() => setActiveComponent("register")} className="hover:underline font-bold text-2xl mr-2">
              Register
            </button>
            <button onClick={() => setActiveComponent("login")} className="hover:underline font-bold text-2xl ml-5">
              Login
            </button>
        </div> 
        ) : (
          <div className="flex items-center gap-4 cursor-pointer">
            <form className="flex items-center gap-2 cursor-pointer " onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search by name/email"
                className="px-2 py-1 rounded text-gray-900 focus:outline-none  focus:ring-green-700 bg-green-50"
              /> 
               <select 
                value={source} 
                onChange={(e) => setSource(e.target.value)}
                 className="px-2 py-1 rounded text-gray-900 focus:outline-none focus:ring-green-700 bg-green-50">
                <option value="">All Sources</option>
                <option value="website">Website</option>
                <option value="referral">Referral</option>
                <option value="instagram">Instagram</option>
              </select>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value)}
                className="px-2 py-1 rounded text-gray-900 focus:outline-none focus:ring-green-700 bg-green-50"
              >
                <option value="">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="lost">Lost</option>
              </select>
              <select 
                value={sort} 
                onChange={(e) => setSort(e.target.value)} 
                className="px-2 py-1 rounded text-gray-900 focus:outline-none focus:ring-green-700 bg-green-50"
              >
                 <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
               <button 
               onClick={handleSearch}
               type="button"
               className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 cursor-pointer"
              >
               Search
              </button>
            </form>
            <span className="font-bold text-xl mr-4 capitalize border-2 border-gray-300 rounded-full w-10 h-10 flex items-center justify-center bg-gray-200 text-gray-800">
              {lead?.name ? lead.name.charAt(0).toUpperCase() : "Profile"}
            </span>
          <Logout 
          setIsLoggedIn={setIsLoggedIn} 
          setActiveComponent={setActiveComponent} />
        </div>
        )}
       </div>
    </nav>
    </>
  );
};

export default Navbar;
