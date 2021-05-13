
import "./QuizView.css";
import Start from "./Start";



import React, { useState, useEffect, useReducer } from "react";
import quizService from "../../services/quiz.service";

function QuizView() {
  const [quizData, setQuizData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);



  const loadQuizData = () => {
    quizService.getAllquestions()
    .then((data) => data.sort(() => Math.random() - 0.5))
    .then((question) => setQuizData(question)
    );
  };

 

  useEffect(() => {
    loadQuizData();
  }, []);

  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < 10) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    window.location.reload();
  };

  return (
    <div>
      {showScore
        ? quizData && (
            <div className="score">
              You scored {score} out of 10
              <button className="restart-btn" onClick={restartQuiz}>
                Restart
              </button>
            </div>
          )
        : quizData && (
            <div className="box">
              <div className="quiz-container">
                <span>
                  Question {currentQuestion + 1}/10
                </span>
                <div className="question">
                  {quizData && quizData[currentQuestion].questionText}
                </div>

                {quizData &&
                  quizData[currentQuestion].answerOptions.map(
                    (answerOption) => (
                      <button
                        className="options"
                        onClick={() =>
                          handleAnswerOptionClick(answerOption.isCorrect)
                        }
                      >
                        {answerOption.answerText}
                      </button>
                    )
                  )}
              </div>
            </div>
          )}
    </div>
  );
}

export default QuizView;
