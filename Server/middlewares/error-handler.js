export const errorHandler = (err, req, res, next) => {
    // Set the response status code to 404 (as per the original code) and return the error message in JSON format
    res.status(404).json({ message: err.message });

    // Call the next middleware (though this isn't typically needed after sending a response)
    next();
}