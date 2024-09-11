import mongoose from "mongoose";

// Function to connect to the MongoDB database
export const connectDB = (url) => {
    // Use mongoose.connect to establish a connection to the database using the provided URL
    return mongoose.connect(url)
        .then()
        .catch((error) => {
            console.error('Database connection error:', error);  // Log any connection errors
            throw error;  // Propagate the error for further handling
        });
}
