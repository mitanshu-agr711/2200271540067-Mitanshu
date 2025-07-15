const express = require('express');
const loggingMiddleware = require('./middlewares/loggingMiddleware');
const ShortUrlController = require('./controllers/shortUrlController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());


app.use(loggingMiddleware);


app.post('/shorturls', ShortUrlController.createShortUrl);
app.get('/:shortcode', ShortUrlController.redirectShortUrl);
app.get('/shorturls/:shortcode', ShortUrlController.getStatistics);


app.use(errorHandler);

module.exports = app;
