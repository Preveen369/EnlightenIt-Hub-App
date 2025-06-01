import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { FaBars } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BsMoon, BsSun } from 'react-icons/bs';

import { UserContext } from '../context/userContext.js';

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(window.innerWidth > 800 ? true : false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const { currentUser } = useContext(UserContext);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? 'light' : 'dark';
    document.body.classList.toggle('dark-mode', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, [isDarkMode]);

  const closeNavHandler = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <nav>
      <div className="container nav_container">
        <Link to="/" className="nav_logo" onClick={closeNavHandler}>
          <img src={logo} alt="Navbar Logo" />
          <span className="logo-title">EnlightenIt Hub Blogs</span>
        </Link>

        <button className="theme-toggle-btn mobile-only" onClick={toggleTheme}>
          {isDarkMode ? <BsSun /> : <BsMoon />}
        </button>

        {currentUser?.id && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandler}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandler}>Create Post</Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandler}>Logout</Link>
            </li>
            <li>
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
            </li>
          </ul>
        )}

        {!currentUser?.id && isNavShowing && (
          <ul className="nav_menu">
            <li>
              <Link to="/authors" onClick={closeNavHandler}>Authors</Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandler}>Login</Link>
            </li>
            <li>
              <button className="theme-toggle-btn" onClick={toggleTheme}>
                {isDarkMode ? <BsSun /> : <BsMoon />}
              </button>
            </li>
          </ul>
        )}

        <button className="nav_toggle-btn" onClick={() => setIsNavShowing(!isNavShowing)}>
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
