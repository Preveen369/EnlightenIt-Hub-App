import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext.js";
import Avatar from "../images/avatar15.jpg";
import { FaCheck, FaEdit } from "react-icons/fa";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const {currentUser} = useContext(UserContext);
  const token = currentUser?.token;
  const navigate = useNavigate();
  
  // redirect to login page for any user who isn't logged in
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [])

  return (
    <section className="profile">
      <div className="container profile_container">
        <Link to={`/myposts/sdfsdf`} className="btn">
          My Posts
        </Link>

        <div className="profile_details">
          <div className="avatar_wrapper">
            <div className="profile_avatar">
              <img src={avatar} alt="" />
            </div>
            {/* Form to update avatar */}
            <form className="avatar_form">
              <input
                type="file"
                name="avatar"
                accept="png, jpg, jpeg"
                id="avatar"
                onChange={(e) => setAvatar(e.target.files[0])}
              />
              <label htmlFor="avatar">
                <FaEdit />
              </label>
            </form>
            {/* <button className="profile_avatar-btn"><FaCheck/></button> */}
          </div>

          <h1>Preveen</h1>

          {/* form to update user details */}
          <form className="form profile_form">
            <p className="form_error-message">This is an error message</p>
            <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)}/>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}/>
            <input type="password" placeholder="Current password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)}/>
            <input type="password" placeholder="New password" value={newPassword} onChange={e => setNewPassword(e.target.value)}/>
            <input type="password" placeholder="Confirm New password" value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)}/>
            <button type="submit" className="btn primary">Update details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
