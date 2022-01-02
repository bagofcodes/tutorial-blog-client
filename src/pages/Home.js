import React from 'react'
import axios from 'axios';
import {useEffect,useState} from 'react';
import {useNavigate,Link} from 'react-router-dom';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import {AuthContext} from '../helpers/AuthContext';
import {useContext} from 'react';


function Home() {
    const [postList, setPostList] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const {authstate} = useContext(AuthContext);
    const history= useNavigate();

    useEffect(()=>{
      if(!authstate.isLoggedIn){
        history("/login");
      }
      else{
        axios.get("https://tutorial-blog-server.herokuapp.com/posts",{headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
        setPostList(response.data.listPost);
        setLikedPosts((response.data.likedPosts).map((like)=>like.PostId));
      })

      }},[]);

    const postALike = (postId)=>{
      axios.post("https://tutorial-blog-server.herokuapp.com/likes",{PostId: postId},{headers: {accessToken: localStorage.getItem("accesstoken")}}).then((response)=>{
        setPostList(postList.map((post)=>{
          if(post.id === postId){
            if(response.data.liked){
              return {...post,Likes: [...post.Likes, 0 ]};
            }
            else{
              const la= post.Likes
              la.pop();
              return {...post, Likes: la};
            }
          }
          else{
            return post;
          }
        }));


        if(likedPosts.includes(postId)){
          setLikedPosts(likedPosts.filter((id)=>{return id != postId}));
        }
        else{
          setLikedPosts([...likedPosts,postId]);
        }
      })

    }




    return (
        <div>
             {postList.map((v,k)=>{
                 return (<div className='post' key={v.id} >
                            <div className='title' >{v.title}</div>
                            <div className='body' onClick={()=>{history(`/singlePost/${v.id}`)}}>{v.postText}</div>
                            <div className='footer'>
                              <div className="username"><Link to={`/profile/${v.UserId}`}>{v.username}</Link></div>
                              <div className="buttons">
                                <ThumbUpIcon onClick={() => {postALike(v.id);}}
                                className={likedPosts.includes(v.id) ? "unlikeBttn" : "likeBttn"}
                                />
                                <h4> {v.Likes.length}</h4>
                              </div>
                            </div>
                          </div>
                    );})}
        </div>
    )
}

export default Home
