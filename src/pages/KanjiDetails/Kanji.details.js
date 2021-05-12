import React, { useState, useEffect } from "react";
import lessonsService from "../../services/lessons.service";
import "./Kanji.details.css";
import {useParams} from "react-router-dom"
const spinnerURL = "https://media1.giphy.com/media/3oEjI6SIIHBdRxXI40/200.gif";


function SingleKanji () {
 const [kanji, setKanji] = useState([])
const [isReady, setIsReady] = useState(false)

const {lessonId} = useParams();


useEffect(() => {
 loadKanji()
}, [])

  const loadKanji = () => {
   
    lessonsService.getOneLesson(lessonId).then((lesson) => {
     setKanji(lesson)
     setIsReady(true)
    });
  };

 
    if (!isReady) return <img src={spinnerURL} alt="loading spinner" />;
    return (
      <div className="card">
        {kanji.kanji && kanji.kanji.map((singleKanji) => {
          const {
            kanji,
            meanings,
            grade,
            stroke_count,
            kun_readings,
            on_readings,
          } = singleKanji;
          return (
            <div
              key={singleKanji._id}
              className="flip-container"
              ontouchstart="this.classList.toggle('hover');"
            >
              <div className="flipper">
                <div className="front">
                  <h1> {kanji}</h1>
                  <p>{meanings}</p>
                </div>
                <div className="back">
                  <h2 className="small-title"> {kanji}</h2>

                  <ul>
                    <li> Difficulty level: {grade}</li>
                    <li> Strokes: {stroke_count}</li>
                    <li> Meanings: {meanings}</li>
                    <li> Kunyomi: {kun_readings}</li>
                    <li> Onyomi: {on_readings}</li>
                  </ul>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

export default SingleKanji;
