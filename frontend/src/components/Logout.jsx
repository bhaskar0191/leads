import  React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const Logout = ({setIsLoggedIn, setActiveComponent}) => {

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        const res = await axios.post("http://localhost:5000/leads/logout", {}, {
            withCredentials: true,  
        });
        if(res.status === 200){
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setActiveComponent("home");
            navigate("/");
            alert(res.data.message);
        }else {
        alert("Logout failed");
      } 
    
    } catch (error) {
        console.error("Error during logout:", error);
        alert("An error occurred while trying to logout.");
    }
  }
  return (
    <button onClick={handleLogout} className="hover:underline  font-bold ml-5">
      Logout
    </button>
  );
};

export default Logout;