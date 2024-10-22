
# Quiz Masters

## Overview
Quiz Masters is a real-time multiplayer quiz game platform where players can compete in themed quiz rooms. This project utilizes a distributed database architecture with MongoDB to ensure scalability, high availability, and performance optimization.

## Roadmap
### Phase 1: User creation & single player
- Implement single-player mode.
- Develop basic game logic and API endpoints.
- Set up MongoDB databases and collections.

### Phase 2: Multiplayer Features
- Introduce real-time multiplayer functionality using Socket.IO.
- Create themed quiz rooms and categories.
- Implement ranking system and leaderboards.

### Phase 3: User Experience Enhancements
- Design and develop an intuitive user interface.
- Improve responsiviness.
- Introduce player profiles, achievements and customization options.

### Phase 4: Testing and Deployment to cloud
- Conduct thorough testing.
- Optimize performance and scalability.
- Deploy the application on a cloud platform.

## Technologies
- **Frontend**: React, Vite
- **Backend**: Deno, Oak, Socket.IO?
- **Database**: MongoDB

## Developer Guide

Welcome to the project! This guide will help you get started and understand the key components of the codebase.

### Project Overview

The project is divided into two main parts: **backend** and **frontend**. Each part has its own set of tools and frameworks.

### Key Tools and Technologies

- **Deno**: A secure and modern runtime to replace Node.js.

Useful commands:
   ```bash
   deno run dev
   deno i npm:<package-name>
   ```

[Deno Documentation](https://deno.land/manual)

- **ESLint**: A tool for identifying and fixing problems in the JavaScript code. The `.eslintrc.js` file contains the rules and configurations for linting.

[ESLint Documentation](https://eslint.org/docs/user-guide/getting-started)

- **Vite**: A fast build tool for modern web projects, used in the frontend. The `vite.config.js` file contains settings specific to Vite.

[Vite Documentation](https://vitejs.dev/guide/)

- **RSuite**: UI library for building modern web interfaces. Used in the frontend to create components like buttons, modals, and more for a consistent, clean UI experience.

[RSuite Documentation](https://rsuitejs.com/)

### Getting Started

Install Deno if you don't have it:
[irm https://deno.land/install.ps1 | iex](https://docs.deno.com/runtime/getting_started/installation/)

1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Set Up Environment Variables**:
   (No enviroment variables exist yet so skip this)

3. **Install Dependencies**:
   - For backend and frontend:
     ```bash
     cd backend
     deno i
     ```
   - For the frontend (npm):
     ```bash
     cd frontend
     deno i
     ```

4. **Run the Development Server**:
   - Backend:
     ```bash
     deno...
     ```
   - Frontend:
     ```bash
     deno run dev
     ```

### Directory Structure

- **backend/**: Contains all server-side logic, including routes, models, and configuration.

- **frontend/**: Contains all client-side code, including components, pages, and styles.
index.html and main.jsx act as entry point to the application. main.jsx is also responsible for selecting which page to display.
Assets folder is used for images.
Each component has it's own folder for organization. Index files combine the other components inside the folder, which is then imported to one or more pages.
Each page has it's own folder and they are built using sections (components). The current page is determined in the main.jsx.
Data folder contains static files that are used to render specific components for example.

## Database Structure
WIP

## License
This project is licensed under the [MIT License](LICENSE).
