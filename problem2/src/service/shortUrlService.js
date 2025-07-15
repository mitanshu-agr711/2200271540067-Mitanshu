
const dayjs = require('dayjs');
const { shortLinks, clickEvents } =require ('../models/dataStore.js');
const{ generateShortcode } =require( '../utils/shortcodeGenerator.js');

const SHORTCODE_LENGTH = 6;
const DEFAULT_VALIDITY_MINUTES = 30;
const MAX_GENERATION_RETRIES = 5;

class ShortUrlService {
  static isExpired(expiry) {
    return dayjs().isAfter(dayjs(expiry));
  }

  static async createShortUrl({ url, validity, shortcode }) {

    if (shortcode) {
      if (shortLinks.has(shortcode)) {
        const err = new Error('Shortcode already exists');
        err.statusCode = 409;
        throw err;
      }
    
    } else {
     
      let tries = 0;
      do {
        shortcode = generateShortcode();
        tries += 1;
      } while (shortLinks.has(shortcode) && tries < MAX_GENERATION_RETRIES);

      if (shortLinks.has(shortcode)) {
        const err = new Error('Unable to generate unique shortcode');
        err.statusCode = 500;
        throw err;
      }
    }

    const createdAt = dayjs();
    const expiryTime = validity
      ? createdAt.add(validity, 'minute')
      : createdAt.add(DEFAULT_VALIDITY_MINUTES, 'minute');

    shortLinks.set(shortcode, {
      originalUrl: url,
      createdAt: createdAt.toISOString(),
      expiry: expiryTime.toISOString(),
      totalClicks: 0,
    });

    clickEvents.set(shortcode, []);

    return {
      shortcode,
      expiry: expiryTime.toISOString(),
    };
  }

  static async getOriginalUrlAndRecordClick(shortcode, req) {
    const shortLink = shortLinks.get(shortcode);
    if (!shortLink) {
      const err = new Error('Shortcode not found');
      err.statusCode = 404;
      throw err;
    }

    if (this.isExpired(shortLink.expiry)) {
      const err = new Error('Shortcode expired');
      err.statusCode = 410;
      throw err;
    }


    const clickRecord = {
      timestamp: dayjs().toISOString(),
      referrer: req.get('referer') || null,
      ip: req.ip,
      geo_location: this.lookupGeoLocation(req.ip),
    };

    clickEvents.get(shortcode).push(clickRecord);


    shortLink.totalClicks += 1;

    return shortLink.originalUrl;
  }

  
  static async getShortUrlStatistics(shortcode) {
    const shortLink = shortLinks.get(shortcode);
    if (!shortLink) {
      const err = new Error('Shortcode not found');
      err.statusCode = 404;
      throw err;
    }

    const clicks = clickEvents.get(shortcode) || [];

    return {
      total_clicks: shortLink.totalClicks,
      original_url: shortLink.originalUrl,
      creation_date: shortLink.createdAt,
      expiry_date: shortLink.expiry,
      detailed_clicks: clicks.map(({ timestamp, referrer, geo_location }) => ({
        timestamp,
        referrer,
        geo_location,
      })),
    };
  }

 
  static lookupGeoLocation(ip) {
    
    return ip;
  }
}

module.exports = ShortUrlService;
