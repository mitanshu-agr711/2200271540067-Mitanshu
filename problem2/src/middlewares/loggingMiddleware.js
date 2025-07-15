const Log = require('../utils/logger');

module.exports = async function loggingMiddleware(req, res, next) {
  const start = Date.now();


  try {
    await Log(
      'backend',
      'info',
      'url-shortener-microservice',
      `Incoming ${req.method} request to ${req.originalUrl}`
    );
  } catch (err) {
   
  }


  next();


  res.on('finish', async () => {
    const duration = Date.now() - start;
    try {
      await Log(
        'backend',
        'info',
        'url-shortener-microservice',
        `Request to ${req.originalUrl} completed with status ${res.statusCode} in ${duration}ms`
      );
    } catch (err) {
     
    }
  });
};
