
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ code: '500', message: 'Internal Server Error' });
}

module.exports = errorHandler;
