# 🌟 EnlightenIt-Hub-App - MERN blogging platform

![Platform](https://img.shields.io/badge/Platform-Web-blue.svg)
![Frontend](https://img.shields.io/badge/Frontend-React-orange.svg)
![Backend](https://img.shields.io/badge/Backend-Node.js-red.svg)
![Backend](https://img.shields.io/badge/Backend-Express.js-aqua.svg)
![Database](https://img.shields.io/badge/Database-MongoDB-emerald.svg)
![Language](https://img.shields.io/badge/Language-JavaScript-yellow.svg)
![License](https://img.shields.io/badge/License-MIT-lightgrey.svg)

The **EnlightenIt-Hub-App** is a full-stack MERN blogging platform that enables users to create, share, and explore content across diverse topics. It features a modern UI, responsive design, and secure JWT-based authentication. Users can register, manage profiles, follow authors, and interact with posts through a personalized dashboard. Media uploads are handled via Cloudinary, and data is stored in MongoDB. The React frontend (deployed on Render) communicates with a Node.js/Express backend via RESTful APIs, with CORS support for cross-origin access—creating a scalable and engaging space for knowledge sharing.

---

## 🚀 Features

### 📝 Blogging Platform

- Create, share, and explore posts on various topics.
- Follow your favorite creators and discover trending topics.

### 🔒 Secure & Friendly

- Authentication using JSON Web Tokens (JWT), Bcrypt.js.
- Safe and welcoming space for users to connect and grow.

### 🌐 Full-Stack Integration

- Frontend communicates with the backend via RESTful APIs.
- Backend handles CRUD operations with MongoDB.
- **CORS Configuration**: Backend is configured to allow cross-origin requests from frontend

### 📱 Responsive Design

- Adapts to different screen sizes for a consistent experience.
- Ensures usability on both desktop and mobile devices.

### ☁️ File Storage Integration

- Integrated with Cloudinary for efficient and secure file storage.
- Supports uploading and managing images for posts and user profiles.

### 👤 Author Features

- View posts created by specific authors.
- Follow authors to stay updated on their latest posts.

### 🗂️ Category-Based Features

- Browse posts by categories to find content of interest.
- Filter posts based on specific topics like education, science, or entertainment.

### 📊 Dashboard

- Access a personalized dashboard to manage your posts.
- Edit or delete posts directly from the dashboard.

### 📄 Post Detail

- View detailed information about individual posts.
- See the author, category, and creation date of each post.

### 👥 User Profile

- Manage your profile information, including name and avatar.
- Update your profile details and preferences.

---

## 🛠️ Tech Stack

- **Frontend**: React, CSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  
- **File Storage**: Cloudinary  

---

## 📂 Project Structure

```plaintext
enlightenit-hub-app/
    ├── server/
    │   ├── controllers/       # Backend controllers for user and post operations
    │   ├── middleware/        # Authentication and error handling middleware
    │   ├── models/            # MongoDB schema models (User, Post)
    │   ├── routes/            # API routes for user and post operations
    │   ├── utils/             # Utility functions (e.g., Cloudinary config)
    │   └── index.js           # Main backend server file
    ├── client/
    │   ├── public/            # Static assets for the React app
    │   ├── src/
    │   │   ├── components/    # React components (Header, Footer, PostItem, etc.)
    │   │   ├── context/       # Context API for user state management
    │   │   ├── pages/         # React pages (Register, UserProfile, etc.)
    │   │   ├── App.css        # Main CSS styles for the app
    │   │   ├── App.js         # Main React app component
    │   │   └── index.js       # React entry point
    │   ├── package.json       # Frontend dependencies
    │   └── package-lock.json  # Frontend dependency lock file
    ├── .gitignore             # Git ignore file
    ├── package.json           # Backend dependencies
    ├── package-lock.json      # Backend dependency lock file
    ├── LICENSE                # MIT License file
    └── README.md              # Project documentation
```

---

## 🧪 Installation & Setup

### 📋 Prerequisites

- Node.js (v14 or higher)  
- npm or yarn  
- MongoDB (local installation or MongoDB Atlas)
- A Cloudinary Account (for cloud media storage)
- Postman API (for API endpoints testing)

### 🧑‍💻 Steps to run

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/EnlightenIt-Hub-App.git
   cd EnlightenIt-Hub-App
   ```

2. **Set up the backend**

   - Navigate to the server directory:

     ```bash
     cd server
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the `server` directory and add the following:

     ```env
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     CLOUDINARY_NAME=your_cloudinary_name
     CLOUDINARY_API_KEY=your_cloudinary_api_key
     CLOUDINARY_API_SECRET=your_cloudinary_api_secret
     ```

   - Start the backend server locally:

     ```bash
     npm run dev
     ```

     The backend server will run on `http://localhost:5000`.

3. **Set up the frontend**

   - Open a new terminal and navigate to the client directory:

     ```bash
     cd client
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

   - Start the frontend development server:

     ```bash
     npm start
     ```

     🌐 Open your browser and navigate to `http://localhost:3000`.

4. **Build for Production (Optional)**

   - In the `client` directory, build the React app:

     ```bash
     npm run build
     ```

     The built files will be in the `client/build` directory.

5. **Deployment on Render**

   ### ⭐ Frontend Deployment on Render

    The frontend is deployed as a static site on the Render platform for scalable hosting.
    To deploy your own instance on Render:
    - Push the `client` directory to a GitHub repository.
    - Create a new Static Site on Render and connect your repository.
    - Set the build command to `npm run build`.
    - Set the publish directory to `build`.
    - Deploy the service, and Render will provide a live URL for the frontend.

   ### ⭐ Backend Deployment on Render

    The backend is deployed on the Render platform for scalable hosting.
    To deploy your own instance on Render:
    - Push the `server` directory to a GitHub repository.
    - Create a new Web Service on Render and connect your repository.
    - Set the environment variables in Render's dashboard:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

    - Deploy the service, and Render will provide a live URL for the backend API.
  
   🌐 Access your app live at: <https://enlightenit-hub-app.onrender.com/>

---

## ➡️ Connecting Frontend, Backend, and MongoDB

To connect the frontend, backend, and MongoDB, follow these steps:

1. **Backend Configuration**

   Ensure the backend is properly configured to connect to MongoDB by setting the `MONGO_URI` environment variable in the `.env` file located in the `server` directory:

   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

   The backend uses this connection string to interact with the MongoDB database for CRUD operations.

2. **Update CORS Configuration**

   In the backend's `index.js` file, update the CORS configuration to allow requests from the frontend. Replace the existing CORS middleware configuration with the following:

   ```javascript
   const cors = require('cors');

   app.use(cors({
     credentials: true,
     origin: "http://localhost:3000" // Replace with your frontend URL
   }));
   ```

   This ensures that the backend accepts requests from the deployed frontend.

3. **Frontend API Integration**

   In the frontend, ensure that API requests are directed to the backend server. Update the `src/context/userContext.js` or any other relevant file to include the backend API URL:

   ```javascript
   const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL
   ```

   Use this base URL to make API calls from the frontend to the backend for fetching or sending data.

4. **Testing the Connection**

   Start the backend server:

   ```bash
   cd server
   npm run dev
   ```

   Start the frontend development server:

   ```bash
   cd client
   npm start
   ```

   Ensure that the frontend can successfully fetch data from the backend and that the backend can interact with MongoDB.

5. **Deployment**

   When deploying, ensure that the frontend is configured to use the deployed backend URL. Update the API base URL in the frontend to point to the live backend service (e.g., Render backend URL).

   Verify that the backend environment variables are correctly set in the hosting platform (e.g., Render dashboard).

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the repository and suggest improvements.

Steps to contribute:

```bash
# 1. Fork the repository
# 2. Create a feature branch
git checkout -b feature-name

# 3. Commit your changes
git commit -m "Add feature description"

# 4. Push to GitHub
git push origin feature-name

# 5. Open a Pull Request
```

---

## 📧 Contact

For queries or suggestions:

- 📩 Email: [spreveen123@gmail.com](mailto:spreveen123@gmail.com)  
- 🌐 LinkedIn: [www.linkedin.com/in/preveen-s-17250529b/](https://www.linkedin.com/in/preveen-s-17250529b/)

---

## 🌟 Show Your Support

If you like this project, please consider giving it a ⭐ on GitHub!
