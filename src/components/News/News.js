import React, { useState, useEffect } from "react";
import axios from "axios";
import "./News.css";

function News() {
  const [news, setNews] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const loadNews = async () => {
    try {
      let res = await axios.get(
        process.env.REACT_APP_API_URL + "/api/proxy/news"
        // "https://newsapi.org/v2/top-headlines?country=jp&apiKey=cee726d1eb8c4517a7d4597d6c731727"
      );
      if (res) {
        const { data } = res;
        setNews(data);
        setIsReady(true);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    loadNews();
  }, []);

  return (
  <div>
    {isReady &&
      news.articles.map((oneArticle) => (
        <div className="news">
          <img src={oneArticle.urlToImage} />
          <a href={oneArticle.url} target="_blank">
            {oneArticle.title}
          </a>
        </div>
      ))}
  </div>
  )
}

export default News;
