export const notFound = (req, res, next) => {
    // Set the response status to 404 for "Not Found"
    res.status(404).send('Page not found'); // Send a simple message for non-existent routes

    // Call the next middleware (if needed), though typically not necessary after sending a response
    next();
}
