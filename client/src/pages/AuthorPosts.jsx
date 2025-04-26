import React, { useState, useEffect } from "react";
import PostItem from "../components/PostItem";
import Loader from "../components/Loader";
import axios from "axios";
import { useParams } from "react-router-dom";

const AuthorPosts = () => {
  const [posts, setPosts] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try{
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(response?.data);
      } catch (err) {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          alert("Session expired or unauthorized. Please login again.");
          // Optionally redirect to login page here
          window.location.href = "/login";
        } else {
          console.error(err);
        }
      }

      setIsLoading(false);
    }
    fetchPosts();
  }, [id]);

  if(isLoading){
    return <Loader/>
  }

  return (
    <section className="posts">
      {posts.length > 0 ? <div className="container posts_container">
        {posts.map(({ _id: id, thumbnail, category, title, description, creator, createdAt }) => (
          <PostItem
            key={id}
            postID={id}
            thumbnail={thumbnail}
            category={category}
            title={title}
            description={description}
            authorID={creator}
            createdAt={createdAt}
          />
        ))}
      </div> : <h2 className="center">No posts found</h2>}
    </section>
  );
};

export default AuthorPosts;
