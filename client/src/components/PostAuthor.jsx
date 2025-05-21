import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

const PostAuthor = ({authorID, createdAt}) => {
const [author, setAuthor] = useState({});

  useEffect(() => {
    const getAuthor = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${authorID}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAuthor(response?.data);
      } catch (error) {
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          alert("Session expired or unauthorized. Please login again.");
          // Optionally redirect to login page here
          window.location.href = "/login";
        } else {
          console.error("Error fetching author data:", error);
        }
      }
    }
    getAuthor();
  }, [authorID])

  return (
    <Link to={`/posts/users/${authorID}`} className='post_author'>
        <div className="post_author-avatar">
          {/* Use the Cloudinary URL directly */}
          <img src={author?.avatar} alt="" />
        </div>
        <div className="post_author-details">
            <h4>By: {author?.name}</h4>
            <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US'/></small>

        </div>
    </Link>
  )
}

export default PostAuthor;
