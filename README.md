# React Job Application Portal

A modern, responsive job application portal built with React, TailwindCSS, and Vite. This project allows users to browse, add, edit, and delete job listings, providing a seamless user experience.

## Features

### Core Features
- **Job Listings**: View a list of available job opportunities with detailed information
- **Responsive Design**: Fully responsive UI built with TailwindCSS
- **Routing**: Smooth navigation using `react-router-dom`
- **Notifications**: User-friendly toast notifications powered by `react-toastify`
- **Icons**: Beautiful icons provided by `react-icons`
- **Mock Backend**: Simulated backend using `json-server`
- **Gradient Buttons**: Modern gradient design for buttons and interactive elements

### User Features
- **Authentication System**:
  - User registration and login
  - Protected routes for authenticated users
  - Persistent authentication using localStorage
  - Secure password handling
  - User session management

- **Job Interaction**:
  - Save/unsave jobs for later viewing
  - Apply for jobs with application tracking
  - View detailed job information
  - Filter and search job listings

## Project Structure

The project is organized as follows:

```
src/
  assets/          # Static assets like images
  components/      # Reusable UI components
    auth/         # Authentication-related components
  context/        # React context providers
  layouts/        # Layout components
  pages/          # Page components for routing
  App.jsx         # Main application component
  main.jsx        # Entry point
  jobs.json       # Mock data for job listings
```

## Technologies Used

- **React**: Frontend library for building user interfaces
- **TailwindCSS**: Utility-first CSS framework for styling
- **Vite**: Fast build tool for modern web projects
- **React Router**: Declarative routing for React applications
- **React Toastify**: Notifications for React
- **React Icons**: Icon library for React
- **JSON Server**: Mock backend for development
- **Context API**: State management for user authentication and data

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the JSON server (in a separate terminal):
   ```bash
   npm run server
   ```

The application will be available at `http://localhost:5173` and the JSON server at `http://localhost:8000`.

## Available Scripts

- `npm run dev`: Start the development server
- `npm run build`: Build the application for production
- `npm run server`: Start the JSON server for the mock backend
- `npm run preview`: Preview the production build
- `npm run lint`: Run ESLint for code linting

