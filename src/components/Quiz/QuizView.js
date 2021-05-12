// import React, { useState, useEffect, useRef } from "react";
// import Quiz from "../../pages/QuizPage/QuizPage";
// import { QuizData } from "./QuizData";
import "./QuizView.css";
import Start from "./Start";

// function Quizview(prevState) {

//   const [userAnswer, setUserAnswer] = useState(null);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [choices, setChoices] = useState([]);
//   const [quizEnd, setQuizEnd] = useState(false);
//   const [score, setScore] = useState(0);
//   const [disabled, setDisabled] = useState(true);
//   const [id, setId] = useState(0);
//   const [quizLength, setQuizLength] = useState(0);
//   const mounted = useRef();
//   const [question, setQuestion] = useState();
//   //Get index and start Quiz
//   const shuffleArray = () => {
//     return QuizData.sort(() => Math.random() - 0.5);
//   };
//   const loadQuiz = () => {
//     // const { currentIndex } = this.state; //get the current index
//     this.setState(() => {
//       shuffleArray();
//       return {
//         question: QuizData[currentIndex].question,
//         choices: QuizData[currentIndex].choices,
//         answer: QuizData[currentIndex].answer,
//       };
//     });
//   };
//   //Pass to the next question - pass to next index
//   const nextQuestionHandle = () => {
//     const random = Math.floor(Math.random() * QuizData.length);
//     this.setState({
//       currentIndex: currentIndex + 1,
//       quizLength:quizLength + 1,
//     });
//     console.log(quizLength);
//     //Check for correct answer and increment score
//     if (userAnswer === answer) {
//      setScore( score + 1);

//   };
//   useEffect(() => {
//     if (!mounted.current) {
//       loadQuiz();
//     } else {
//       if (currentIndex !== prevState.currentIndex) {
//         this.setState(() => {
//           return {
//             disabled: true,
//             question: QuizData[currentIndex].question,
//             choices: QuizData[currentIndex].choices,
//             answer: QuizData[currentIndex].answer,
//           };
//         });
//       }
//     }
//   });

//   //Updating component
//   // componentDidUpdate(prevProps, prevState) {
//   //   const { currentIndex } = this.state;
//   //   if (this.state.currentIndex !== prevState.currentIndex) {
//   //     this.setState(() => {
//   //       return {
//   //         disabled: true,
//   //         question: QuizData[currentIndex].question,
//   //         choices: QuizData[currentIndex].choices,
//   //         answer: QuizData[currentIndex].answer,
//   //       };
//   //     });
//   //   }
//   // }
//   //Confirm answers
//   const checkAnswer = (answer) => {
// setUserAnswer(answer)
//   };
//   //Finish quiz when questions finished
//   const finishHandle = () => {
//     if (quizLength === 10) {
//     setQuizEnd(false)
//     }
//   };
//   const restartQuiz = () => {
//     window.location.Reload();
//   };
//   //End screen
//   if (quizEnd) {
//     return (
//       <div className="box">
//         <div className="quiz-container">
//           <p>Final score: {score} out of 10</p>
//           <p>Correct answers:</p>
//           <ul>
//             {QuizData.slice(0, 10).map((item) => (
//               <li className="choices">
//                 {item.question} {item.answer}
//               </li>
//             ))}
//           </ul>
//           {/* Restart Quiz */}
//           <div>
//             <button
//               className="next-btn"
//               onClick={() => window.location.reload()}
//             >
//               Restart
//             </button>
//             {/* {this.state.show ? <Start /> : null} */}
//           </div>
//         </div>
//       </div>
//     );
//   }
//   return (
//     //Quiz view
//     <div className="box">
//       <div className="quiz-container">
//         <h1>{question}</h1>
//         {choices &&
//           choices.map((choice) => (
//             <button
//               key={choice.id}
//               className={`options
//                 ${userAnswer === choice ? "selected" : null}
//                 `}
//               onClick={() => checkAnswer(choice)}
//             >
//               {choice}
//             </button>
//           ))}
//         {currentIndex < 10 && (
//           <div className="next-btn-container">
//             <button className="next-btn" onClick={this.nextQuestionHandle}>
//               Next
//             </button>
//           </div>
//         )}
//         {/* Shows answers */}
//         {quizLength === 10 && (
//           <div className="next-btn-container">
//             <button className="finish-btn" onClick={this.finishHandle}>
//               Finish
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Quizview;

import React, { useState, useEffect, useReducer } from "react";
import quizService from "../../services/quiz.service";

function QuizView() {
  const [quizData, setQuizData] = useState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const loadQuizData = () => {
    quizService.getAllquestions().then((question) => setQuizData(question));
  };

  useEffect(() => {
    loadQuizData();
  }, []);



  const handleAnswerOptionClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

const restartQuiz = () => {
  window.location.reload()
}



  return (
    <div>
      {showScore
        ? quizData && (
           <div className="score">
              You scored {score} out of {quizData.length}
             <button className= "restart-btn" onClick={restartQuiz}>Restart</button>
           
              </div>
          )
        : quizData && (
            <div className="box">
              <div className="quiz-container">
                <span>Question {currentQuestion + 1}/{quizData.length}</span>
                <div className="question">{quizData && quizData[currentQuestion].questionText}</div>
                
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
