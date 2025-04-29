import React, { useState, useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css"; 
import { UserContext } from "../context/userContext.js";
import axios from "axios";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [error, setError] = useState("");

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  
  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [])

  const modules = {
    toolbar: [
      [{'header': [1,2,3,4,5,6,false]}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image'],
      ['clean']
    ],
  }

  const formats = [
    'header', 
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", 
  "Investment", "Uncategorized", "Weather"];

  
  const createPost = async (e) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category);
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);

    try{
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/posts/`, postData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 201){
        return navigate('/');
      }
    } catch(err) {
      setError(err.response.data.message);
    }
  }

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error &&  <p className="form_error-message">{error}</p>}
        <form className="form create-post_form" onSubmit={createPost}>
          <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} autoFocus/>
          <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
            {
              POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)
            }
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription} 
          className="q1-editor"/>
            <input type="file" onChange={e => setThumbnail(e.target.files[0])} accept='png, jpg, jpeg'/>
            <button type="submit" className="btn primary">Create</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;
