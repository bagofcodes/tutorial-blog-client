import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';
import {useContext} from 'react';

export default function ProfilePage() {
    const {id} = useParams();
    const [username,setUsername]=useState("");
    const [listOfPosts,setListOfPosts] = useState([]); 
    const {authstate} = useContext(AuthContext);
    let navigate = useNavigate();

    useEffect(()=>{
        axios.get(`https://tutorial-blog-server.herokuapp.com/auth/profile/${id}`).then((response)=>{
            setUsername(response.data.username);
        })

        axios.get(`https://tutorial-blog-server.herokuapp.com/posts/byuserId/${id}`).then((response)=>{
            setListOfPosts(response.data);
        })

    },[])




    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1>Username:- {username}</h1>
                {(authstate.username === username)&&(<button onClick={()=>navigate("/changePassword")}>Update Password</button>)}
            </div>
            <div className='listOfPosts'>
                {listOfPosts.map((value, key) => {
                    return (
                    <div key={key} className="post">
                        <div className="title">{value.title}</div>
                        <div className="body" onClick={() => {navigate(`/singlePost/${value.id}`);}}>{value.postText}</div>
                        <div className="footer">
                            <div className="username">{value.username}</div>
                            <div className="buttons">
                                <label> Likes:- {value.Likes.length}</label>
                            </div>
                        </div>
                    </div>
                    );
                })}

            </div>
            
        </div>
    )
}
