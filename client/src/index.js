import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import Layout from './components/Layout';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import PostDetail from './pages/PostDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import UserProfile from './pages/UserProfile';
import Authors from './pages/Authors';
import CreatePost from './pages/CreatePost';
import CategoryPosts from './pages/CategoryPosts';
import AuthorPosts from './pages/AuthorPosts';
import Dashboard from './pages/Dashboard';
import EditPost from './pages/EditPost';
import DeletePost from './pages/DeletePost';
import Logout from './pages/Logout';
import UserProvider from './context/userContext';
import LandingPage from './pages/LandingPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <LandingPage/>},
      {path: "home", element: <Home/>},
      {path: "posts/:id", element: <PostDetail/>},
      {path: "register", element: <Register/>},
      {path: "login", element: <Login/>},
      {path: "profile/:id", element: <UserProfile/>},
      {path: "authors", element: <Authors/>},
      {path: "create", element: <CreatePost/>},  
      {path: "posts/categories/:category", element: <CategoryPosts/>},  
      {path: "posts/users/:id", element: <AuthorPosts/>},  
      {path: "myposts/:id", element: <Dashboard/>},  
      {path: "posts/:id/edit", element: <EditPost/>},
      {path: "posts/:id/delete", element: <DeletePost/>},
      {path: "logout", element: <Logout/>},
    ]
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);

