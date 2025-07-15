import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config({ path: process.env.LOGGER_DOTENV || '.env' });

const LOG_URL = 'http://20.244.56.144/evaluation-service/logs';

/**
 * Log to Affordmed Test Server
 * @param {"backend"|"frontend"} stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} level
 * @param {string} pkg
 * @param {string} message
 */
export async function Log(stack, level, pkg, message) {
  try {
    const { AFFORDMED_TOKEN } = process.env;
    if (!AFFORDMED_TOKEN) throw new Error('Missing AFFORDMED_TOKEN');

    const res = await axios.post(
      LOG_URL,
      { stack, level, package: pkg, message },
      { headers: { Authorization: `Bearer ${AFFORDMED_TOKEN}` } }
    );
    // Optionally echo logID locally
    console.debug(`Log sent (${res.data.logID})`);
  } catch (err) {
    // Fallback local log
    console.error('Failed to send log', err.message);
  }
}
