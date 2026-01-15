const axios = require("axios");

const fetchNews = async ({ topic, language, country }) => {
  const response = await axios.get("https://gnews.io/api/v4/search", {
    params: {
      q: topic,
      lang: language,
      country,
      max: 10,
      apikey: process.env.GNEWS_API_KEY
    }
  });

  return response.data.articles;
};

module.exports = fetchNews;