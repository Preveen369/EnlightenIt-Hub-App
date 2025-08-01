import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../context/userContext.js";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; 
import axios from "axios";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  const {id} = useParams();
  
  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [])

  const modules = {
    toolbar: [
      [{'header': [1,2,3,4,5,6,false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote', {'color': ['#000000', '#e60000', '#ff9900', 
        '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', 
        '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', 
        '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000',
        '#663d00', '#666600', '#003700', '#002966', '#3d1466']}],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image', 'color'
  ];

  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", 
  "Investment", "Uncategorized", "Weather"];


  useEffect(() => {
      const getPost = async() => {
        try{
          const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
          setTitle(response.data.title);
          setCategory(response.data.category);
          setDescription(response.data.description);
          
        } catch(error) {
          console.log(error);
        }
      }
      getPost();
  }, []) 

  const editPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try{
      const token = localStorage.getItem('token');
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200){
        return navigate('/');
      }
    } catch(err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="create-post edit-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form_error-message">{error}</p>}
        <form className="form create-post_form" onSubmit={editPost}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} 
          className="q1-editor"/>
            <input style={{color:"darkgrey"}} type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
            <button type="submit" className="btn primary">Update</button>
        </form>
      </div>
    </section>
  );
};

export default EditPost;
