import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../helpers/AuthContext';

function Login() {
    const [username,setUsername]=useState("");
    const [password,setPassword] = useState("");
    const {setAuthState} = useContext(AuthContext);

    const navigate= useNavigate();

    const loginHandle = ()=>{
        axios.post("http://localhost:5000/auth/login", {
            username:username,
            password:password
        }).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                localStorage.setItem("accesstoken",response.data.token);
                setAuthState({
                    username: response.data.username,
                    id: response.data.id,
                    isLoggedIn: true,
                });

            }
            setUsername("");
            setPassword("");
            navigate("/");
            
        })
    }

    return (
        <div className='loginContainer'>
            <label>Username:</label>
            <input type="text" onChange={(e)=>setUsername(e.target.value)} value={username}/>
            <label>Password:</label>
            <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
            <button onClick={loginHandle}>Login</button>
        </div>
    )
}

export default Login
