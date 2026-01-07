import {useState} from 'react'
import axios from 'axios';


function Login(){
    const [loginText, setLoginText] = useState("");
    const [passwordText, setPasswordText] = useState("");

    function handleLoginChange(e){
        e.preventDefault();
        setLoginText(e.target.value);
    }

    function handlePasswordChange(e){
        e.preventDefault();
        setPasswordText(e.target.value);
    }

    const handleClick = async(e)=>{
        e.preventDefault();
        const url = 'http://localhost:8000/login';
        const data = {'loginID':loginText,'password':passwordText};
        console.log(data)
        setLoginText("");
        setPasswordText("");
        try{
            const response = await axios.post(url,data);
            console.log(response.data);
        } catch(error){
            console.error('Axios error:', error);
        }
    }

    return(
        <div className="container border border-secondary p-3 rounded my-5 w-50 mx-auto">
        <h1 className="text-center">Login</h1>
        <form className="d-flex justify-content-center flex-column align-items-center">
            <div className="mb-3 w-50">
                <label htmlFor="exampleInputEmail1" className="form-label">Login ID</label>
                <input type="text" className="form-control" placeholder="Enter Login ID" aria-describedby="emailHelp" value={loginText} onChange={handleLoginChange} />
            </div>
            <div className="mb-3 w-50">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" placeholder="Enter Password" value={passwordText} onChange={handlePasswordChange} />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
        </form>
        </div>
    )
}

export default Login;