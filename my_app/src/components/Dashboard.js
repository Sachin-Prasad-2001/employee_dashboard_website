import {useEffect, useState} from 'react';
import axios from 'axios';
import './Dashboard.css';

function Dashboard(){
    const [table, setTable] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState({loginID:"",password:"",name:"",age:""});


    useEffect(()=>{
        axios.get("http://localhost:8000/dashboard").then((res)=>{setTable(res.data); console.log(res.data)}).catch((error)=>{setError(error)});
    },[]);

    function handleUpdate(id){
        console.log('Update');
        console.log(id);
    }
    function handleDelete(id){
        const newTable = table.filter(element=>element.loginID!=id);
        setTable(newTable);
        console.log('Delete');
    }
    const handleSave = async()=>{
        const url = 'http://localhost:8000/save';
        try{
            const response = axios.put(url,table);

        } catch(error){
            console.error('Axios error:',error);
        }
    }
    function handleChange(e){
        e.preventDefault();
        const {name,value} = e.target;
        setUserData((prev)=>({
            ...prev,
            [name]:value
        }));
        console.log(userData);
    }
    function handleAddUser(){
        setTable(table=>[...table,userData]);
        setUserData({loginID:"",password:"",name:"",age:""})
        console.log(table);
    }
    if (error) return <p>{error}</p>;
    if (!table) return <p>Loading...</p>;
    return (
        <div className="container border border-secondary p-3 rounded my-4">
        <h1 className="text-center">Dashboard</h1>
        <div>
            <input type="text" className="short_input" name="loginID" onChange={handleChange} placeholder="Login ID" value={userData.loginID}/>
            <input type="password" className="short_input" name="password" onChange={handleChange} placeholder="password" value={userData.password}/>
            <input type="text" className="short_input" name="name" onChange={handleChange} placeholder="name" value={userData.name}/>
            <input type="text" className="short_input" name="age" onChange={handleChange} placeholder="age" value={userData.age}/>
            <button type="submit" className="btn btn-primary mx-2" onClick={handleAddUser}>Add User</button>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th scope="col">Login ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Age</th>
                </tr>
            </thead>
            <tbody>
                {table.map(element=>(
                    <tr>
                        <td>{element['loginID']}</td>
                        <td>{element['name']}</td>
                        <td>{element['age']}</td>
                        <td>
                            <button type="button" className="btn btn-primary mx-2" onClick={()=>{return handleUpdate(element['loginID'])}}>Update</button>
                            <button type="button" className="btn btn-danger mx-2" onClick={()=>{return handleDelete(element['loginID'])}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>

        </table>
        <button type="button" className="btn btn-success" onClick={handleSave}>Save</button>
        </div>
    )
}

export default Dashboard;