# 🌟 EnlightenIt-Hub-App - Backend (Server)

This is the backend documentation for the **EnlightenIt-Hub-App**, a MERN blogging platform. The backend is built with **Node.js**, **Express.js**, and **MongoDB**, providing RESTful APIs for the frontend to interact with. 

🔗 **Related Documentation**: [Main Project README](../README.md) | [Client README](../client/README.md)

---

## 🛠️ Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT), Bcrypt.js
- **File Storage**: Cloudinary
- **CORS**: Configured to allow cross-origin requests from the frontend

---

## 📂 Server Folder Structure
```plaintext
server/
    ├── controllers/       # Backend controllers for user and post operations
    ├── middleware/        # Authentication and error handling middleware
    ├── models/            # MongoDB schema models (User, Post)
    ├── routes/            # API routes for user and post operations
    ├── utils/             # Utility functions (e.g., Cloudinary config)
    └── index.js           # Main backend server file
```

---

## 🧪 Installation & Setup
### 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas)
- A Cloudinary Account (for cloud media storage)
- Postman API (for API endpoints testing)

### 🧑‍💻 Steps to Run
1. **Navigate to the server directory**
   ```bash
   cd server
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `server` directory and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   CLOUDINARY_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```
   The backend server will run on `http://localhost:5000`.

---

## ➡️ Connecting to Frontend and MongoDB
1. **MongoDB Configuration**
   Ensure the `MONGO_URI` environment variable in the `.env` file points to your MongoDB database for CRUD operations.

2. **CORS Configuration**
   In the `index.js` file, configure CORS to allow requests from the frontend:
   ```javascript
   const cors = require('cors');
   app.use(cors({
     credentials: true,
     origin: "http://localhost:3000" // Replace with your frontend URL
   }));
   ```

3. **Testing the Connection**
   Start the backend server:
   ```bash
   npm run dev
   ```
   Ensure the frontend (see [Client README](../client/README.md)) can fetch data from the backend, and the backend can interact with MongoDB.

---

## ⭐ Deployment on Render
The backend is deployed on the Render platform for scalable hosting. To deploy your own instance:
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

For frontend deployment details, refer to the [Client README](../client/README.md).

---

## 🤝 Contributing
Contributions to the backend are welcome! Refer to the [Main README](../README.md) for contribution guidelines.

---

## 📧 Contact
For queries or suggestions:
- 📩 Email: [spreveen123@gmail.com](mailto:spreveen123@gmail.com)
- 🌐 LinkedIn: [www.linkedin.com/in/preveen-s-17250529b/](https://www.linkedin.com/in/preveen-s-17250529b/)

---

## 🌟 Show Your Support
If you like this project, please consider giving it a ⭐ on GitHub!
