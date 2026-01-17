import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const AuthContext = createContext(null);

function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        axios.get("http://localhost:8000/me",{withCredentials:true}).then((res)=>{setUser(res.data);console.log(res.data);}).catch((error)=>{setUser(null);console.log(error)}).finally(()=>{setLoading(false);});

    },[]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated: !!user,
                loading
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;