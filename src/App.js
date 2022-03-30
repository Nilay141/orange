import React, {useEffect, useState} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase.js';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {Button, Input} from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

function App() {
  const [posts,setPosts] = useState([
    // {
    //   imgAvatar:"/static/image/avatar/avatar (0).png", 
    //   username:"nilay", 
    //   caption:"hiiiiii", 
    //   imageUrl:"/static/image/post (2).jpg"
    // },
    // {
    //   imgAvatar:"/static/image/avatar/avatar (5).jpg", 
    //   username:"black", 
    //   caption:"widow", 
    //   imageUrl:"/static/image/post (3).jpg"
    // },
    // {
    //   imgAvatar:"/static/image/avatar/avatar (6).jpg", 
    //   username:"Orange", 
    //   caption:"qwerty", 
    //   imageUrl:"/static/image/post (1).jpg"
    // }
  ]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const handleLogin = () => setOpenSignIn(true);
  const handleSignUp = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user,setUser] = useState(null);


// useEffect is like run on condition
  useEffect(() =>{
    const unsubcribe = auth.onAuthStateChanged((authUser) =>{
      if(authUser){
        //user logged in
        console.log(authUser);
        setUser(authUser);//uses cookiee tracking
      } else{
        //logged out
        setUser(null);
      }
    })

    return () => {
      unsubcribe();
    }

  },[user,username])

  useEffect(() => {
    /* -run every time post change
   -fetch from firebase
   -onsnaphot fire code every time change happens
   */
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id:doc.id,
        post: doc.data()
      })));
    });
  }, [])

  const signUp = (event) => {
    event.preventDefault();

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        diaplayName:username
      })
    })
    .catch((error) => alert(error.message))

    setOpen(false);

  }

  const signIn =(event) =>{
    event.preventDefault();  

    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error) => alert(error.message));

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <div >
            <center>
              <div className='app__header1'>
                <img className='app__headerImage'
                      src="/static/image/1.0.0.png" 
                      alt="Orange"/>
              </div>
              <form className='app__signup'>
                <Input 
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                />
                <Input 
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="submit" onClick={signUp}>Sign Up</Button>
              </form>
            </center>
          </div>
        </Box>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <Box sx={style}>
          <div >
            <center>
              <div className='app__header1'>
                <img className='app__headerImage'
                      src="/static/image/1.0.0.png" 
                      alt="Orange"/>
              </div>
              <form className='app__signup'>
                {/* <Input 
                placeholder="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)} 
                /> */}
                <Input 
                  placeholder="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} 
                />
                <Input 
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="submit" onClick={signIn}>Login</Button>
              </form>
            </center>
          </div>
        </Box>
      </Modal>

      <div className='app__header'>
        <center>
          <div className='app__header1'>
            <img className='app__headerImage'
                  src="/static/image/1.0.0.png" 
                  alt="Orange"/>
          </div>
        </center>
        {user ? (
          <div className='app__loginContainer'>
            <Button onClick={() => auth.signOut()}>LogOut </Button>
          </div>
        ) : (
          <div className='app__loginContainer'>
            <Button onClick={handleLogin}>Login</Button>
            <Button onClick={handleSignUp}>Sign Up</Button>
          </div>
        )}
        
        
      </div>
      <h1>fml</h1>
      <div className=''>
        {
          posts.map(({id, post}) => (
            // adding id will not rerender old post
            <Post key={id} imgAvatar={post.imgAvatar} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      
    </div>
  );
}

export default App;
