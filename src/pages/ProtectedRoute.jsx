import { useEffect } from "react";
import { useAuth } from "../contexts/FakeAuthcontext";
import { useNavigate } from "react-router-dom";
  

function ProtectedRoute({children}){
    const navigate=useNavigate(); 
    const {isAuthenticated}=useAuth();

    useEffect(function(){
     if(!isAuthenticated) navigate("/");
    },[isAuthenticated,navigate])

    return isAuthenticated? children:null;
}

export default ProtectedRoute;