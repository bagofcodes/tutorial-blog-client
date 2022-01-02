import React,{useState} from 'react';
import axios from 'axios';

export default function ChangePassword() {
    const [oldPassword, setOldPassword]= useState("");
    const [newPassword, setNewPassword]= useState("");


    const changePassword=()=>{
        axios.put(`https://tutorial-blog-server.herokuapp.com/auth/changePassword/`,
        {
            oldPassword: oldPassword,
            newPassword: newPassword,

        },
        {headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
            if(response.data.error){
                alert(response.data.error);
            }
            else{
                setOldPassword("");
                setNewPassword("");
                alert("Password Updated Successfully....!!!");
            }
        })
    }


    return (
        <div>
            <h1>Change Your Password</h1>
            <input type="password" placeholder='Old Password...' value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
            <input type="password" placeholder='New Password' value={newPassword} onChange={(e)=>setNewPassword(e.target.value)}/>
            <button onClick={changePassword}>Submit</button>
        </div>
    )
}
