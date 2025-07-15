

const ShortUrlService = require('../service/shortUrlService');
const { createShortUrlSchema } = require('../utils/validation');

class ShortUrlController {
  static async createShortUrl(req, res, next) {
    try {
      
      const { error, value } = createShortUrlSchema.validate(req.body);
      if (error) {
        res.status(400).json({ code: 'BAD_REQUEST', message: error.details[0].message });
        return;
      }

      const { url, shortcode, validity } = value;
      const { shortcode: usedShortcode, expiry } = await ShortUrlService.createShortUrl({
        url,
        shortcode,
        validity,
      });

      const shortLink = `${req.protocol}://${req.get('host')}/${usedShortcode}`;
      res.status(201).json({ shortLink, expiry });
    } catch (err) {
      if (err.statusCode) {
        res.status(err.statusCode).json({ code: err.statusCode.toString(), message: err.message });
      } else {
        next(err);
      }
    }
  }

  static async redirectShortUrl(req, res, next) {
    try {
      const { shortcode } = req.params;
      const originalUrl = await ShortUrlService.getOriginalUrlAndRecordClick(shortcode, req);

      
      res.redirect(302, originalUrl);
    } catch (err) {
      if (err.statusCode === 404) {
        res.status(404).json({ code: '404', message: 'Shortcode not found' });
      } else if (err.statusCode === 410) {
        res.status(410).json({ code: '410', message: 'Shortcode expired' });
      } else {
        next(err);
      }
    }
  }

  static async getStatistics(req, res, next) {
    try {
      const { shortcode } = req.params;
      const stats = await ShortUrlService.getShortUrlStatistics(shortcode);
      res.json(stats);
    } catch (err) {
      if (err.statusCode === 404) {
        res.status(404).json({ code: '404', message: 'Shortcode not found' });
      } else {
        next(err);
      }
    }
  }
}

module.exports = ShortUrlController;
