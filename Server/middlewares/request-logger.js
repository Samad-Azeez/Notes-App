export const logger = (req, res, next) => {
    // Log the request method, URL, response status code, and current timestamp
    console.log({
        method: req.method,            // HTTP method (GET, POST, etc.)
        url: req.url,                  // URL of the request
        statusCode: res.statusCode,     // Response status code
        timestamp: new Date().toISOString()  // Current timestamp in ISO format for accurate log time
    });

    // Call next middleware or route handler
    next();
}
