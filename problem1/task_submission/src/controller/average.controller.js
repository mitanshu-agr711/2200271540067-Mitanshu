import { Log } from 'affordmed-logger';

export function calculateAverage(req, res) {
  const arr = req.body?.numbers;

  if (!Array.isArray(arr) || arr.length === 0)
    return res.status(400).json({ error: 'numbers must be a non‑empty array' });

  if (!arr.every((n) => typeof n === 'number')) {
    Log('backend', 'error', 'handler', 'received non‑number element');
    return res.status(400).json({ error: 'array must contain only numbers' });
  }

  const sum = arr.reduce((acc, n) => acc + n, 0);
  const avg = sum / arr.length;

  Log('backend', 'info', 'handler', `Average computed (${avg}) for length ${arr.length}`);
  res.json({ average: avg });
}
