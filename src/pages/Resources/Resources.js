import React, { useState } from "react";
import News from "../../components/News/News";
import Music from "../../components/Music/Music";
import Syllabaries from "../../components/Syllabaries/Syllabaries";
import Blogs from "../../components/Blogs/Blogs";
import Videos from "../../components/Videos/Videos";
import "./Resources.css";

function Resources() {
  const [showNews, setShowNews] = useState(false);
  const [showMusic, setShowMusic] = useState(false);
  const [showSyllabaries, setShowSyllabaries] = useState(false);
  const [showBlogs, setShowBlogs] = useState(false);
  const [showVideos, setShowVideos] = useState(false);

  const toggleNews = () => {
    setShowNews(!showNews);
  };
  const toggleMusic = () => {
    setShowMusic(!showMusic);
  };
  const toggleSyllabaries = () => {
    setShowSyllabaries(!showSyllabaries);
  };
  const toggleBlogs = () => {
    setShowBlogs(!showBlogs);
  };
  const toggleVideos = () => {
    setShowVideos(!showVideos);
  };
  return (
    <div>
      <div className="resources">
        <div className="api">
          <div className="news-container">
            <p>News</p>
            <button onClick={toggleNews}>Show More</button>
            {showNews ? <News /> : null}
          </div>
          <div className="music-container">
            <p>Music</p>
            <button onClick={toggleMusic}>Show More</button>
            {showMusic ? <Music /> : null}
          </div>
        </div>

        <div className="syllabaries-container">
          <p>Syllabaries</p>
          <button onClick={toggleSyllabaries}>Show More</button>
          {showSyllabaries ? <Syllabaries /> : null}
        </div>
        <div className="other">
          <div className="videos-container">
            <p>Video Tutorials</p>
            <button onClick={toggleVideos}>Show More</button>
            {showVideos ? <Videos /> : null}
          </div>
          <div className="blogs-container">
            <p>Recommended Blogs</p>
            <button onClick={toggleBlogs}>Show More</button>
            {showBlogs ? <Blogs /> : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resources;
