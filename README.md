---

# Movies Website Frontend

This project is the frontend of a Movies Website, developed using React and deployed using Jenkins with Nginx on a virtual machine. The primary goal of this project is to demonstrate proficiency in setting up continuous integration and continuous deployment (CI/CD) pipelines using Jenkins, while effectively deploying a React application on an Nginx web server.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [CI/CD Pipeline with Jenkins](#cicd-pipeline-with-jenkins)
- [Deployment Process](#deployment-process)
- [Project Setup](#project-setup)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Movies Website Frontend is a responsive web application built with React. It provides users with an interactive interface to browse and search for movies. This project showcases my ability to automate the deployment process of a frontend application using Jenkins, ensuring smooth and reliable updates to the live environment.

## Technologies Used

- **Frontend**: React, JavaScript, HTML, CSS
- **Web Server**: Nginx
- **CI/CD**: Jenkins
- **Virtualization**: Virtual Machine

## CI/CD Pipeline with Jenkins

The deployment pipeline for this project is fully automated using Jenkins. The pipeline is designed to perform the following steps:

1. **Code Checkout**: The Jenkins pipeline starts by checking out the latest code from the GitHub repository.
2. **Build**: The React application is built using npm, ensuring that all dependencies are installed and the production-ready build is created.
3. **Deployment**: The built application is deployed to a virtual machine where Nginx is configured to serve the React application on port 90.

### Pipeline Stages

1. **Checkout Code**: Jenkins checks out the code from the `main` branch of the GitHub repository.
2. **Install Dependencies**: The pipeline installs all required npm packages.
3. **Build Application**: The React application is built for production using the `npm run build` command.
4. **Deploy to Nginx**: The built files are copied to the Nginx web directory on the virtual machine, and Nginx is configured to serve the application on port 90.

## Deployment Process

The deployment process leverages Jenkins for automating the build and deployment of the React application:

1. **Configure Jenkins**: A Jenkins job is configured with the necessary credentials and environment settings to access the virtual machine.
2. **Build and Deploy**: The Jenkins pipeline automatically builds the React app and deploys it to the virtual machine where Nginx is configured to serve it.
3. **Access the Application**: Once deployed, the application can be accessed via the VM's IP address on port 90.

## Project Setup

To set up this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/EsraaShaabanElsayed/movies-website-frontend.git
   ```
2. Navigate to the project directory:
   ```bash
   cd movies-website-frontend
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`.

## Screenshots

![Screenshot from 2024-08-11 02-04-54](https://github.com/user-attachments/assets/e1f93796-ead9-4ced-b789-4d29428fc6db)



---
