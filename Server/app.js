import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './database/connect.js';
import { notes } from './routes/notes.js';
import { errorHandler } from './middlewares/error-handler.js';
import { notFound } from './middlewares/404-pages.js';
import { logger } from './middlewares/request-logger.js';

const app = express();
dotenv.config();
const port = process.env.PORT || 3000;


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);

//routes
app.use('/api/v1/notes', notes);

// 404 handler
app.use(notFound);

// error handler
app.use(errorHandler);

// Start server
const start = async () => {
    try {
       await connectDB(process.env.MONGO_URI);

       app.listen(port, () => {
           console.log(`Server is running on port ${port} ...`);
       });
    } catch (error) {
        console.error(error);
    }
}

start();

