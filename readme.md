# Student Attendance System

## Overview

The Student Attendance System is a web application designed to manage and track student attendance records. It allows users to sign up, log in, and manage attendance records. The application is built using Node.js, Express, MongoDB, and includes a simple front-end interface.

## Setup and Installation

To get started with this project, follow the steps below:

1.  **Clone the repository:**

        git clone https://github.com/ashishj12/Student_Attendance.git
        cd Student_Attendance

2.  **Install dependencies:**

Ensure you have `npm` installed. Run the following command to install all required packages:

        npm install

3.  **Set Up Enviroment Variable**

Create a `.env `file in the root of the project and add the following environment variables:

        PORT=3000
        MONGODB_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret

4. **Run The Application**

Start the server with:

        npm start

The application will be running on http://localhost:3000.

# Usage Instructions

## Web Interface

- Access the Application:

Open your web browser and navigate to http://localhost:3000.
You will be presented with the root page where you can choose to log in or sign up.

- Sign Up:

On the root page, click the "Sign Up" button or link.
Enter your username, email, and password.
Click the "Sign Up" button to create a new account.

- Log In:

On the root page, click the "Login" button or link.
Enter your username and password.
Click the "Login" button to access the system.

- Manage Attendance:

After logging in, you will be redirected to the main page.
Here you can add new attendance records and view existing records.

- Pagination:

Use the "Previous" and "Next" buttons to navigate through attendance records.

# Folder Structure

Here is a brief overview of the folder structure:

- controllers/ - Contains business logic for handling requests.
- models/ - Defines MongoDB schemas and models.
- routes/ - Defines the routes for handling HTTP requests.
- public/ - Contains static files such as HTML, CSS, and JavaScript.
- middleware/ - Contains middleware functions, including authentication.
- server.js - Entry point of the application.

# Contributing

Contributions to the project are welcome. To contribute:

- Fork the repository.
- Create a feature branch (git checkout -b feature-branch).
- Commit your changes (git commit -am 'Add new feature').
- Push to the branch (git push origin feature-branch).
- Create a new Pull Request.
