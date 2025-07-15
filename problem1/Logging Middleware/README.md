# Logging Middleware

A reusable logging middleware package for Express.js applications.

## Features

- HTTP request logging using Morgan
- Application logging using Winston
- Error logging middleware
- Custom request logging middleware
- File-based log storage
- Console logging for development

## Installation

```bash
npm install
```

## Usage

```javascript
const { logger, httpLogger, errorLogger, requestLogger } = require('./index');

// Use in Express app
app.use(httpLogger);
app.use(requestLogger);

// Error logging (should be used after all routes)
app.use(errorLogger);

// Direct logging
logger.info('Application started');
logger.error('An error occurred');
```

## Log Files

- `logs/error.log` - Error logs only
- `logs/combined.log` - All logs

## Dependencies

- Winston: Application logging
- Morgan: HTTP request logging
