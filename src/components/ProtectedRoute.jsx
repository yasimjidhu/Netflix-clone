import React from "react";
import { Navigate, useAsyncError, useNavigate } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const {user} = UserAuth()
    if(!user){
        return <Navigate to='/'/>
    }else{
        return children
    }
};

export default ProtectedRoute;
