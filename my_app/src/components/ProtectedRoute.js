import {Navigate} from 'react-router-dom';
import {useState, useContext} from 'react';
import {AuthContext} from './AuthProvider';

function ProtectedRoute({children}){
    const {user,isAuthenticated, loading} = useContext(AuthContext);
    console.log(loading);
    console.log(user);
    if(loading){
        return (
            <div>
                Loading ...
            </div>
        )
    }
    if(isAuthenticated==false){
        return <Navigate to="/login" replace/>
    }
    return children;
}

export default ProtectedRoute;