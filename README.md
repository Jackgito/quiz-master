
# Quiz Masters

## Overview
Quiz Masters is a real-time multiplayer quiz game platform where players can compete in themed quiz rooms. This project utilizes a distributed database architecture with MongoDB to ensure scalability, high availability, and performance optimization.

## Table of Contents
- [Features](#features)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Database Structure](#database-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Roadmap
### Phase 1: MVP Development
- Implement single-player mode.
- Develop basic game logic and API endpoints.
- Set up MongoDB databases and collections.

### Phase 2: Multiplayer Features
- Introduce real-time multiplayer functionality using Socket.IO.
- Create themed quiz rooms and categories.
- Implement ranking system and leaderboards.

### Phase 3: User Experience Enhancements
- Design and develop an intuitive user interface with React.
- Add responsiveness and accessibility features.
- Introduce player profiles and customization options.

### Phase 4: Testing and Deployment
- Conduct thorough testing (unit, integration, and end-to-end).
- Optimize performance and scalability.
- Deploy the application on a cloud platform.

## Technologies
- **Frontend**: React, Vite
- **Backend**: Deno, Oak
- **Database**: MongoDB
- **Real-Time Communication**: Socket.IO

## Developer Guide

Welcome to the project! This guide will help you get started and understand the key components of our codebase.

### Project Overview

The project is divided into two main parts: **backend** and **frontend**. Each part has its own set of tools and frameworks.

### Key Tools and Technologies

- **Deno**: A secure runtime for JavaScript and TypeScript. The backend is built using Deno, which allows for modern features and better security. You'll find configuration files like `deno.json` and `deno.lock` in the `backend` directory.

[Deno Documentation](https://deno.land/manual)

- **ESLint**: A tool for identifying and fixing problems in your JavaScript code. The `.eslintrc.js` file contains the rules and configurations for linting. Make sure to run ESLint regularly to maintain code quality.

[ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)

- **Vite**: A fast build tool for modern web projects, used in the frontend. The `vite.config.js` file contains settings specific to Vite.

[Vite Documentation](https://vitejs.dev/guide/)

- **RSuite**: UI library for building modern web interfaces. Used in the frontend to create components like buttons, modals, and more for a consistent, clean UI experience.

[RSuite Documentation](https://rsuitejs.com/)

- [Project Structure Documentation](https://blog.webdevsimplified.com/2022-07/react-folder-structure/)

### Getting Started

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Set Up Environment Variables**:
   Copy the `.env.example` to `.env` and fill in your environment-specific variables.

3. **Install Dependencies**:
   - For the backend (Deno):
     ```bash
     deno run --allow-net --allow-read main.js
     ```
   - For the frontend (npm):
     ```bash
     cd frontend
     npm install
     ```

4. **Run the Development Server**:
   - Backend:
     ```bash
     deno run --allow-net main.js
     ```
   - Frontend:
     ```bash
     npm run dev
     ```

### Directory Structure

- **backend/**: Contains all server-side logic, including routes, models, and configuration.
- **frontend/**: Contains all client-side code, including components, pages, and styles.

## Database Structure
WIP

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd quiz-masters
   ```

2. Install dependencies:
   - For the frontend:
     ```bash
     cd frontend
     npm install
     ```

   - For the backend:
     ```bash
     cd backend
     deno task setup
     ```

3. Create a `.env` file in the root directory and configure your environment variables:
   ```env
   MONGODB_URI=<your-mongodb-uri>
   PORT=<your-desired-port>
   ```

4. Start the development servers:
   - For the frontend:
     ```bash
     cd frontend
     npm run dev
     ```
   - For the backend:
     ```bash
     cd backend
     deno task dev
     ```

## License
This project is licensed under the [MIT License](LICENSE).