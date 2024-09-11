export const logger = (req, res, next) => {
    console.log({
        'Request Rethod': req.method,
        'Request URL': req.url,
        'Response StatusCode': res.statusCode
    });
    next()
}