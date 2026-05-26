# Helo Authentication System

A Node.js and Express-based web application providing user authentication features including signup and login with comprehensive server-side validation.

## Features

- **User Signup**: Create a new account with detailed validation:
  - **Name Validation**: First and last names must contain only alphabetical characters.
  - **Email Validation**: Ensures a valid email format.
  - **Phone Number Validation**: Specifically for Egyptian numbers (starts with +201, followed by 0, 1, 2, or 5, and 8 additional digits).
  - **Age Restriction**: Users must be born before 2012.
  - **Password Security**: Minimum of 8 characters and must match the confirmation password.
- **Secure Password Hashing**: Uses `bcryptjs` to hash passwords before storing them in the database.
- **User Login**: Authenticate existing users by verifying credentials.
- **Templating**: Dynamic UI rendering using EJS.
- **Database Persistence**: Stores user information securely in MongoDB using Mongoose.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Frontend**: EJS (Embedded JavaScript templates), CSS
- **Authentication**: bcryptjs for password hashing

## Project Structure

- `index.js`: Main entry point, containing server setup, middleware, and authentication routes.
- `src/config.js`: Database connection setup and Mongoose User schema definition.
- `views/`: EJS templates for the frontend.
  - `login.ejs`: User login page.
  - `signup.ejs`: User registration page.
  - `home.ejs`: Dashboard/Home page after successful login.
- `views/public/`: Static files such as `style.css`.

## Installation

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Ensure you have a MongoDB instance running and update the connection string in `src/config.js` if necessary.

## Usage

Start the server:
```bash
node index.js
```
The application will be available at `http://localhost:5200`.
