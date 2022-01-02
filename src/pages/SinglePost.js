import React,{useEffect,useState} from 'react';
import {useParams,useNavigate} from 'react-router-dom';
import axios from 'axios';
import {AuthContext} from '../helpers/AuthContext';
import {useContext} from 'react';

function SinglePost() {
    const {id} = useParams();
    const [postObject, setPostObject] =  useState({});
    const [comments, setComments] =useState([]);
    const [comment,setComment] = useState("");
    const {authstate} = useContext(AuthContext);

    let nav= useNavigate();


    useEffect(()=>{
        axios.get(`https://tutorial-blog-server.herokuapp.com/posts/byId/${id}`).then((response)=>{
            setPostObject(response.data);
        })
    
      },[id]);
    useEffect(()=>{
        axios.get(`https://tutorial-blog-server.herokuapp.com/comments/${id}`).then((response)=>{
            setComments(response.data);
        })
    },[id]);

    const addComment = ()=>{
        axios.post("https://tutorial-blog-server.herokuapp.com/comments/", {commentBody: comment, PostId: id,},
        {headers: {accessToken: localStorage.getItem("accesstoken")} }
        ).then((response)=>{
            if(response.data.error){
                console.log(response.data.error);
            }
            else{
                const commentToAdd = {commentBody: comment, username: response.data.username}
                setComments([...comments,commentToAdd]);
                setComment("");
            }
        })
    };

    const deleteComment = (id)=>{
        axios.delete(`https://tutorial-blog-server.herokuapp.com/comments/${id}`, {headers: {accessToken: localStorage.getItem("accesstoken")}}).then(()=>{
            setComments(comments.filter((val)=>{
                return val.id !== id;
            }))
        })

    }


    const deletePost= (id)=>{
        axios.delete(`https://tutorial-blog-server.herokuapp.com/posts/${id}`, {headers: {accessToken: localStorage.getItem("accesstoken")}}).then(()=>{
            console.log("Deleted Post Successfully");
            nav("/");

        })

    }

    const editPost = (option)=>{
        if(option === "title"){
            let newTitle = prompt("Enter new Title");
            axios.put("https://tutorial-blog-server.herokuapp.com/posts/title",{newTitle: newTitle, id: id},
            {headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
                setPostObject({...postObject,title : newTitle});
            })
        }
        else{
            let newPostText = prompt("Edit your Text");
            axios.put("https://tutorial-blog-server.herokuapp.com/posts/title",{newText: newPostText, id: id},
            {headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
                setPostObject({...postObject,postText : newPostText});
            })
        }
    } 


    return (
        <div className='postPage'>
            <div className='leftSide'>
                <div className='post' id='individual'>
                    <div className='title' onClick={()=>{
                        if(authstate.username === postObject.username){
                            editPost("title")
                        }
                    }}>{postObject.title}</div>
                    <div className='body'onClick={()=>{
                        if(authstate.username === postObject.username){
                            editPost("body")
                        }
                    }}>{postObject.postText}</div>
                    <div className='footer'>
                        {postObject.username}
                        {authstate.username === postObject.username &&(<button onClick={()=>deletePost(postObject.id)}>Delete Post</button>)}
                    </div>
                </div>
            </div>
            <div className='rightSide'>
                <div className='addCommentContainer'>
                    <input type="text" placeholder='Enter Comment' autoComplete='off' 
                    onChange={(e)=>setComment(e.target.value)} value={comment} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((c,k)=>{
                        return (<div key={k} className='comment'>{c.commentBody}
                         <span> @{c.username}</span>{(authstate.username === c.username) && 
                         <button onClick={()=>deleteComment(c.id)}>X</button>}</div>);
                    })}
                </div>

            </div>
        </div>
    )
}

export default SinglePost
