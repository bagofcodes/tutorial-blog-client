import './App.css';
import {BrowserRouter as Router, Route, Routes,Link} from 'react-router-dom';
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import SinglePost from './pages/SinglePost';
import Login from './pages/Login';
import Register from './pages/Register';
import {AuthContext} from './helpers/AuthContext';
import {useState,useEffect} from 'react';
import axios from 'axios';
import PageNotFound from './pages/PageNotFound';
import ProfilePage from './pages/ProfilePage';
import ChangePassword from './pages/ChangePassword';



function App() {
  const [authstate, setAuthState] = useState({
    username: "",
    id: 0,
    isLoggedIn: false
  });
  

  useEffect(()=>{
    axios.get("http://localhost:5000/auth/auth",{
      headers: {
        accessToken: localStorage.getItem("accesstoken"),
      },
    } ).then((response)=>{
      if(response.data.error) {setAuthState({username:"",id:0, isLoggedIn:false});}
      else{
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          isLoggedIn: true,
        });
      }
    })
  },[]);



  const logout = ()=>{
    localStorage.removeItem('accesstoken');
    setAuthState({username:"", id: 0, isLoggedIn: false});
    window.location.replace("/login")
  }
  
  return (
    <div className="App">
      <AuthContext.Provider value={{authstate,setAuthState}}>
      <Router>
        <div className='navbar'>
        {
          !(authstate.isLoggedIn) ?
          (<>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>):
          (<>
            <Link to="/">Home</Link>
            <Link to="/createPost">Create Post</Link>
            <button onClick={logout}>Logout</button>
            <h3 onClick={()=>{window.location.replace(`/profile/${authstate.id}`)}}>@{authstate.username}</h3>
          </>)
        }
        </div>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/createPost" exact element={<CreatePost />} />
          <Route path="/singlePost/:id" exact element={<SinglePost />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/register" exact element={<Register />} />
          <Route path="/profile/:id" exact element={<ProfilePage />} />
          <Route path="/changePassword" exact element={<ChangePassword />} />
          <Route path="*" exact element={<PageNotFound />} />



        </Routes>


      </Router>
      </AuthContext.Provider>
     
    </div>
  );
}

export default App;
