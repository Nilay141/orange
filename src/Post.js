import React from 'react';
import './Post.css';
import { Avatar } from '@mui/material';

function Post({imgAvatar,username,caption,imageUrl}) {
  return (
	<div className='post'>
		<div className='post__header'>
			{/*  avatar + user name + location*/}
			<Avatar className='post__avatar' 
			alt="nilay141" src={imgAvatar} />
			<h3>{username}</h3>
		</div>
		{/* photo + tag */}
		<img className='post__image' src={imageUrl} alt="post"/>
		{/* like + comment + share + save */}
		<h3>like,comment,share,save</h3>
		{/* username + caption */}
		<h4 className='post__text'><strong>{username}:</strong>{caption}</h4>
	</div>
  )
}

export default Post
