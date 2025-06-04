# 🌟 EnlightenIt-Hub-App - Frontend (Client)

This is the frontend documentation for the **EnlightenIt-Hub-App**, a MERN blogging platform. The frontend is built with **React** and **CSS**, providing a modern, responsive user interface for users to create, share, and explore blog posts. 

🔗 **Related Documentation**: [Main Project README](../README.md) | [Server README](../server/README.md)

---

## 🚀 Features

- **Blogging Platform**: Render intuitive UI for creating, sharing, and exploring posts, enabling seamless user interaction with content and creators.
- **Responsive Design**: Adapt to various screen sizes using responsive CSS and flexible layouts, ensuring usability on both desktop and mobile devices.
- **Dashboard**: Present a personalized dashboard UI for managing posts, with intuitive options for editing and deleting user-created content.
- **Post Detail**: Render detailed post pages showing author, category, and creation date, providing a clean and informative user experience.
- **User Profile**: Display and manage user profile interfaces, including editable fields for name, avatar, and preferences, with seamless form handling.

---

## 🛠️ Tech Stack
- **Frontend**: React, CSS
- **State Management**: React Context API
- **File Storage**: Integrated with Cloudinary for media uploads

---

## 📂 Client Folder Structure
```plaintext
client/
    ├── public/            # Static assets for the React app
    ├── src/
    │   ├── components/    # React components (Header, Footer, PostItem, etc.)
    │   ├── context/       # Context API for user state management
    │   ├── pages/         # React pages (Register, UserProfile, etc.)
    │   ├── App.css        # Main CSS styles for the app
    │   ├── App.js         # Main React app component
    │   └── index.js       # React entry point
    ├── package.json       # Frontend dependencies
    └── package-lock.json  # Frontend dependency lock file
```

---

## 🧪 Installation & Setup
### 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Access to the backend server (see [Server README](../server/README.md))

### 🧑‍💻 Steps to Run
1. **Navigate to the client directory**
   ```bash
   cd client
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```
   🌐 Open your browser and navigate to `http://localhost:3000`.

4. **Build for Production (Optional)**
   ```bash
   npm run build
   ```
   The built files will be in the `client/build` directory.

---

## ➡️ Connecting to the Backend
To connect the frontend to the backend, update the API base URL in `src/context/userContext.js` or other relevant files to point to the backend server:

```javascript
const API_BASE_URL = "http://localhost:5000"; // Replace with your backend URL
```

For deployment, ensure this URL points to the live backend service (e.g., Render backend URL). Refer to the [Server README](../server/README.md) for backend setup and CORS configuration.

---

## ⭐ Deployment on Render
The frontend is deployed as a static site on the Render platform for scalable hosting. To deploy your own instance:
- Push the `client` directory to a GitHub repository.
- Create a new Static Site on Render and connect your repository.
- Set the build command to `npm run build`.
- Set the publish directory to `build`.
- Deploy the service, and Render will provide a live URL for the frontend.

For backend deployment details, refer to the [Server README](../server/README.md).

---

## 🤝 Contributing
Contributions to the frontend are welcome! Refer to the [Main README](../README.md) for contribution guidelines.

---

## 📧 Contact
For queries or suggestions:
- 📩 Email: [spreveen123@gmail.com](mailto:spreveen123@gmail.com)
- 🌐 LinkedIn: [www.linkedin.com/in/preveen-s-17250529b/](https://www.linkedin.com/in/preveen-s-17250529b/)

---

## 🌟 Show Your Support
If you like this project, please consider giving it a ⭐ on GitHub!
