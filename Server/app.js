import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/connect.js';
import { notes } from './routes/notes.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFound } from './middlewares/404-pages.js';
import { logger } from './middlewares/request-logger.js';

// Load environment variables from the .env file
dotenv.config();

// Create an instance of an Express application
const app = express();

// Define the port the server will listen on
const port = process.env.PORT || 3000;

// Middleware Setup
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse incoming URL-encoded data
app.use(logger); // Custom logger middleware to log requests

// Routes Setup
app.use('/api/v1/notes', notes); // Set up routes for note management

// Error Handling
app.use(notFound); // Handle requests to non-existent routes
app.use(errorHandler); // Handle errors that occur in the application

// Start Server
const start = async () => {
    try {
        // Connect to the database using the MongoDB URI from environment variables
        await connectDB(process.env.MONGO_URI);
        console.log('Database connected successfully ...');

        // Start the server and listen on the specified port
        app.listen(port, () => {
            console.log(`Server is running on port ${port} ...`);
        });
    } catch (error) {
        // Log any errors that occur during server startup
        console.error('Error starting the server:', error);
    }
}

// Call the start function to run the application
start();
