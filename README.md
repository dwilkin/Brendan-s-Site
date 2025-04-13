# Sales Form Application

A containerized web application featuring a sleek, SEO-optimized sales form that collects customer information and integrates with MongoDB and email notifications.

## Features

- Modern, responsive UI built with React and Material-UI
- Form data submission to MongoDB
- Automatic email notifications
- Calendly integration for scheduling
- Containerized with Docker
- SEO optimized

## Prerequisites

- Docker and Docker Compose
- Node.js (for local development)
- DigitalOcean MongoDB database
- Gmail account for email notifications

## Setup

1. Clone the repository
2. Create a `.env` file in the root directory with the following variables:
   ```
   MONGODB_URI=your-mongodb-connection-uri
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   NODE_ENV=production
   ```

3. For local development:
   ```bash
   # Install dependencies
   npm install
   cd client && npm install

   # Start the backend
   npm start

   # In a new terminal, start the frontend
   cd client && npm start
   ```

4. For production deployment:
   ```bash
   docker-compose up --build
   ```

## DigitalOcean App Platform Deployment

1. Push your code to a Git repository (GitHub, GitLab, etc.)
2. In DigitalOcean App Platform:
   - Create a new app
   - Connect to your Git repository
   - Set the following environment variables:
     - `MONGODB_URI`: Your MongoDB connection string
     - `EMAIL_USER`: Your Gmail address
     - `EMAIL_PASS`: Your Gmail app-specific password
     - `NODE_ENV`: Set to "production"
   - Configure the build command: `npm install && cd client && npm install && npm run build && cd ..`
   - Configure the run command: `npm start`
   - Set the HTTP port to `5000`
   - Enable HTTP health checks
   - Deploy the application

## Environment Variables

- `MONGODB_URI`: Your DigitalOcean MongoDB connection string
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app-specific password
- `NODE_ENV`: Set to "production" for production deployment

## Usage

1. Access the application at your DigitalOcean app URL
2. Fill out the form with customer information
3. Submit the form to:
   - Save data to MongoDB
   - Send email notification
   - Redirect to thank you page with Calendly integration

## Development

- Backend runs on port 5000
- Frontend runs on port 3000 (local development only)

## License

MIT 