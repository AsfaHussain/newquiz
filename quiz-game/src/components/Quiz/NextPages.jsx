import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NextPages.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean",
  },
  {
    question: "What is the capital of Japan?",
    options: ["Seoul", "Beijing", "Tokyo", "Bangkok"],
    correctAnswer: "Tokyo",
  },
];

const NextPages = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    location.state?.currentQuestionIndex || 1
  );
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    if (timeLeft === 0) {
      clearInterval(timer);
      handleSubmit();
    }

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(15);
    setShowResult(false);
    setSelectedAnswer("");
  }, [currentQuestionIndex]);

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false); // Reset for next question
        setSelectedAnswer(""); // Reset answer selection
      } else {
        navigate("/result"); // Navigate to result page after last question
      }
    }, 2000);
  };
  

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      navigate("/");
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2 className="question-title">Question {currentQuestionIndex + 1}</h2>
      <p className="timer">Time left: {timeLeft}s</p>
      <p className="question-text">{currentQuestion.question}</p>
      
      <div className="options-container">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => setSelectedAnswer(option)}
            className={`option-button ${selectedAnswer === option ? "selected" : ""}`}
            disabled={showResult}
          >
            {option}
          </button>
        ))}
      </div>

      {!showResult && (
        <button 
          onClick={handleSubmit} 
          disabled={!selectedAnswer} 
          className="submit-button"
        >
          Submit
        </button>
      )}

      {showResult && (
        <p className={`result-message ${selectedAnswer === currentQuestion.correctAnswer ? "correct" : "incorrect"}`}>
          {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : "Incorrect!"}
        </p>
      )}

      <button onClick={handlePrevious} className="previous-button">Previous</button>
    </div>
  );
};

export default NextPages;
