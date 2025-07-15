import { Log } from 'affordmed-logger';

export function requestLogger(req, res, next) {
  Log('backend', 'info', 'middleware', `Incoming ${req.method} ${req.url}`);
  next();
}
