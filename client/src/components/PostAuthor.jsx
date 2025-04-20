import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../images/avatar1.jpg';

const PostAuthor = () => {
  return (
    <Link to={`/posts/users/sdfsdf`} className='post_author'>
        <div className="post_author-avatar">
            <img src={Avatar} alt="" />
        </div>
        <div className="post_author-details">
            <h4>By: Preveen</h4>
            <small>Just Now</small>
        </div>
    </Link>
  )
}

export default PostAuthor;
