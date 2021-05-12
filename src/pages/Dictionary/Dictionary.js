import React, { useState, useEffect } from "react";
import { withAuth } from "../../context/auth.context";
import dictionaryService from "./../../services/dictionary.service";
import AuthService from "./../../services/auth.service";
import privateService from "./../../services/private.service";
import "./Dictionary.css";

function Dictionary(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [kanji, setKanji] = useState([]);
  const [ready, setReady] = useState(false);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    loadKanji();
  }, []);

  const loadKanji = () => {
    dictionaryService.getKanji().then((kanji) => {
      setReady(true);
      setKanji(kanji);
    console.log(kanji)
    });

  };
  
  const search = () => {
 
    dictionaryService.getSearchResults()
    .then((response) => {
      console.log(response)

      let findMeaning = response.find((data) => {

        return data.meanings.includes(searchTerm);
      });
      console.log(findMeaning)

      setSearchResults([findMeaning]);
    });
  };
console.log(searchResults)
  const addKanjiUser = (kanjiId, userId) => {
    privateService.addToBookmarks({ kanjiId: kanjiId }, userId);
    window.location.reload();
    AuthService.me(props.user._id);
  };
  return (
    <div>
      <div className="dictionary">
        <div className="search">
          <input
            className="search-input"
            placeholder="Search for kanji"
            name="search"
            type="text"
            value={searchTerm}
            onChange={handleChange}
          />

          <button className="search-button" onClick={search}>Search</button>
        </div>
        <div className="card">
          {searchResults &&
            searchResults.map((data, key) => {
              <p>{data}</p>;
              return (
                <div
                  className="flip-container"
                  ontouchstart="this.classList.toggle('hover');"
                >
                  <div className="flipper">
                    <div className="front" key={key}>
                      <h1>{data.kanji}</h1>
                      {/* <p>{data.map((meaning) => meaning + ", ")}</p> */}
                    </div>
                    <div className="back">
                      <h2> {data.kanji}</h2>
                      <ul>
                         <li> Difficulty level: {data.grade}</li>
                        <li> Strokes: {data.stroke_count}</li>
                        <li> {" "} 
                        Meanings:{" "}
                        {data.meanings.map((meaning) => meaning + ", ")} 
                         </li>
                        <li>
                          {" "}
                          Kunyomi: {data.kun_readings.map((kun) => kun + ", ")}
                        </li>
                        <li>
                          {" "}
                          Onyomi: {data.on_readings.map((on) => on + ", ")}
                        </li>
                      </ul>
                      <button
                        className="add-bookmarks"
                        onClick={() =>
                          addKanjiUser(data._id, props.user._id)
                        }
                      >
                        Add to my bookmarks
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default withAuth(Dictionary);
