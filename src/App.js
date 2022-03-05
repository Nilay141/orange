import React,{useState} from 'react';
import './App.css';
import Post from './Post.js';
function App() {
  const [posts,setPosts] = useState([
    {
      imgAvatar:"/static/image/avatar/avatar (0).png", 
      username:"nilay", 
      caption:"hiiiiii", 
      imageUrl:"/static/image/post (2).jpg"
    },
    {
      imgAvatar:"/static/image/avatar/avatar (5).jpg", 
      username:"black", 
      caption:"widow", 
      imageUrl:"/static/image/post (3).jpg"
    },
    {
      imgAvatar:"/static/image/avatar/avatar (6).jpg", 
      username:"Orange", 
      caption:"qwerty", 
      imageUrl:"/static/image/post (1).jpg"
    }
  ]);

  return (
    <div className="app">
      
      <div className='app__header'>
        <img className='app__headerImage'
              src="/static/image/logo2.png" 
              alt="Orange"/>
        {/* <h1 className='app__headerLogo'>Orange</h1> */}
      </div>
      <h1>fml</h1>
      <div className=''>
        {
          posts.map(post => (
            <Post imgAvatar={post.imgAvatar} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          ))
        }
      </div>
      
    </div>
  );
}

export default App;
