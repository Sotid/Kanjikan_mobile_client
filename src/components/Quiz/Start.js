import React, { useState } from "react";
import Quizview from "./QuizView";
import "./Start.css";
function Start() {
  const [visible, setVisible] = useState(false);

  const startQuiz = () => {
    setVisible(true);
  };

  return (
    <div className="start-container">
      {visible ? (
        <Quizview />
      ) : (
        <div>
          <h1 className="start-title">Start the quiz!</h1>
          <button className="next-btn start-btn" onClick={startQuiz}>
            Start
          </button>
        </div>
      )}
    </div>
  );
}

export default Start;
