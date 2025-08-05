# EDUTECH

A modern, responsive educational website with a black and blue theme, featuring:
- Course listing with add-to-cart
- Shopping cart and payment simulation
- Performance analytics dashboard
- Login, search, and filter functionality
- Beautiful UI animations
- Backend API with PostgreSQL integration

## Project Structure

- `index.html` — Main HTML file
- `style.css` — Modern, responsive styles
- `app.js` — SPA logic, UI, and API calls
- `server.js` — Node.js Express backend
- `Logo.jpg` — (Optional) Logo image

## Prerequisites
- Node.js (v16+ recommended)
- PostgreSQL (v12+ recommended)

## PostgreSQL Setup
1. Create a database named `edutech`:
   ```sql
   CREATE DATABASE edutech;
   ```
2. Create a `courses` table:
   ```sql
   CREATE TABLE courses (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     creator VARCHAR(100),
     rating NUMERIC(2,1),
     price INT,
     level VARCHAR(20)
   );
   ```
3. Insert sample data:
   ```sql
   INSERT INTO courses (name, creator, rating, price, level) VALUES
   ('JavaScript Essentials', 'Alice', 4.7, 49, 'Beginner'),
   ('Advanced Python', 'Bob', 4.9, 99, 'Advanced'),
   ('React for Beginners', 'Carol', 4.5, 59, 'Beginner'),
   ('Data Science Bootcamp', 'Dave', 4.8, 129, 'Intermediate'),
   ('UI/UX Design', 'Eve', 4.6, 79, 'Intermediate');
   ```
4. Update the PostgreSQL credentials in `server.js` as needed.

## Backend Setup
1. Install dependencies:
   ```bash
   npm install express cors pg
   ```
2. Start the backend server:
   ```bash
   node server.js
   ```
   The backend will run at [http://localhost:3001](http://localhost:3001)

## Frontend Setup
Just open `index.html` in your browser. For API integration, ensure the backend is running and CORS is enabled.

## Features
- Responsive SPA navigation
- Animated, modern UI
- Course search and filter (by price, level)
- Shopping cart with add/remove
- Payment simulation with popup
- Performance analytics dashboard
- Login button (UI only, extendable)

## Customization
- Update `server.js` for real authentication, cart, and payment logic
- Extend database schema for users, orders, etc.

## License
MIT