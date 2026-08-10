# Sathyabama University CBCS Elective Subjects Management System
![image](https://github.com/user-attachments/assets/a2315ca0-7ae1-4340-8c98-69614927ee24)
![image](https://github.com/user-attachments/assets/f6b98cdc-d8a9-4a5f-9260-85d568f29a99)


## Overview

This is a MERN (MongoDB, Express, React, Node.js) stack project developed for managing elective subjects at Sathyabama University. The system allows faculty members to create and manage elective courses, record student attendance, and maintain marks for each student.

## Features

- **Course Management**: Faculty can create, update, and delete elective courses.
- **Student Management**: Faculty can add, update, and remove students from courses.
- **Attendance Tracking**: Easily record and track student attendance.
- **Marks Management**: Manage and update student marks for each course.
- **User Authentication**: Secure login for faculty and administrative users.
- **Responsive Design**: User-friendly interface accessible on Desktop users.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Bootstrap

## Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- Git
- PostMan

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ajithkumar200513/sathyabama-cbcs
    cd Sathyabama-cbcs
    ```

2. **Install server dependencies**:
    ```bash
    cd ../backend
    npm install
    npm install express
    npm install mongoose
    npm install nodemon
    ```

3. **Install client dependencies**:
    ```bash
    cd ../Frontend/cbcs
    npm install
    npm install react-scripts
    ```
4. **Run the development server**:

In one terminal window, start the backend server:


 ```bash
cd backend
nodemon server.js
 ```

In another terminal window, start the frontend server:


 ```bash
cd frontend/cbcs
npm start
```

5. **Open the application**:

The application should now be running on http://localhost:3000

6. **Usage**

    Register/Login: Faculty members must log in or register to access the system.
    Dashboard: View and manage courses, students, attendance, and marks from the dashboard.
    Create Courses: Add new elective courses and assign faculty.
    Manage Students: Enroll students into courses, track attendance, and view marks.

7. **Folder Structure**
sathyabama-cbcs/
├── frontend/cbcs/                # React frontend
│   ├── public/            # Public assets and index.html
│   ├── src/               # React components and pages
│   ├── App.js             # Main App component
│   └── ...
├── backend/                # Express backend
│   ├── models/            # Mongoose models
│   ├── routes/            # API routes
│   ├── controllers/       # Route controllers
│   ├── middleware/        # Middleware functions
│   ├── server.js          # Entry point for backend
│   └── ...
├── .gitignore             # Git ignore file
├── README.md              # Project documentation
└── package.json           # Project metadata and dependencies


8. **Contributors**

    Contributor 1 - UI and Features(React) - ajithkumar200513
    Contributor 2 - Whole Project with backend and database - AbdualkalamAasath

9. **License**

This project is licensed under the Mozilla Public License 2.0 - see the https://github.com/ajithkumar200513/sathyabama-cbcs/blob/main/LICENSE file for details.

10. **Contact**

For any inquiries or issues, please contact:

    Email: ajithkumar200536@zohomail.in 
    PhoneNo: 9150692535 or 8148470771
    GitHub: ajithkumar200513 and AbdualkalamAasath
    
