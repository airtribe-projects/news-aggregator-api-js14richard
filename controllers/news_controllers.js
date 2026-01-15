const NodeCache = require("node-cache");
const cache = new NodeCache({ stdTTL: 300 });

const User = require("../models/User");
const fetchNews = require("../services/gnews_service");

exports.getPersonalizedNews = async (req, res, next) => {
  try {
    const cacheKey = `news_${req.user.userId}`;

    if (cache.has(cacheKey)) {
      return res.json({
        cached: true,
        articles: cache.get(cacheKey)
      });
    }

    const user = await User.findById(req.user.userId);

    const topic = user.preferences.topics[0];
    const language = user.preferences.language;
    const country = user.preferences.country;

    const articles = await fetchNews({ topic, language, country });

    cache.set(cacheKey, articles);

    res.json({
      cached: false,
      articles
    });
  } catch (error) {
    next(error);
  }
};
