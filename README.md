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
   MONGODB_URI=mongodb+srv://doadmin:zq0K8h61Q5c74a9U@Brendans-app-6eccc0ed.mongo.ondigitalocean.com/admin?tls=true&authSource=admin&replicaSet=Brendans-app
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
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

## Environment Variables

- `MONGODB_URI`: Your DigitalOcean MongoDB connection string
- `EMAIL_USER`: Your Gmail address
- `EMAIL_PASS`: Your Gmail app-specific password

## Usage

1. Access the application at `http://localhost:3000`
2. Fill out the form with customer information
3. Submit the form to:
   - Save data to MongoDB
   - Send email notification
   - Redirect to thank you page with Calendly integration

## Development

- Backend runs on port 5000
- Frontend runs on port 3000

## License

MIT 