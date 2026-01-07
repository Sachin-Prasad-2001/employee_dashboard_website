import {Navigate} from 'react-router-dom';
import {useState} from 'react'

function ProtectedRoute({children}){
    const [auth, setAuth] = useState(false);
    if(auth==false){
        return <Navigate to="/login" replace/>
    }
    return children;
}

export default ProtectedRoute;