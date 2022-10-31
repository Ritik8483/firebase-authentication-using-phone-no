import React from 'react'
import { Navigate } from 'react-router-dom';
import { useUserAuthContext } from '../services/firebaseService';

const ProtectedRoute = ({children}) => {
    console.log('children',children);
    const {user}=useUserAuthContext();
    console.log('ProtectedRoute || USER',user);
  if(!user){
    return <Navigate to='/' />
  }
  return children;
}

export default ProtectedRoute
