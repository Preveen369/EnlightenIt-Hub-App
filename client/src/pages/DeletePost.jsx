import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import axios from "axios";
import Loader from "../components/Loader";

const DeletePost = ({ postId }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const[isLoading, setIsLoading] = useState(false);
  const { currentUser } = useContext(UserContext);
  const token = currentUser?.token;

  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleDelete = async () => {
    setIsLoading(true)

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }

    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}`, 
        { withCredentials : true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200){
        if (location.pathname === `/myposts/${currentUser.id}`) {
          navigate(0);
        } else {
          navigate("/");
        }
      }
      setIsLoading(false)
    } catch (error) {
      console.error("Couldn't delete post:", error);
      alert("Failed to delete post. Please try again.");
    }    
  };

  if (isLoading){
    return <Loader/>
  }

  return (
    <Link className="btn sm danger" 
      onClick={handleDelete}> Delete </Link>
  );
};

export default DeletePost;
