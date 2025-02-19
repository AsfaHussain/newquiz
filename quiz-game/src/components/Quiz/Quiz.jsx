import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Quiz.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris",
  },
];

const Quiz = () => {
  const navigate = useNavigate();
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

  const handleSubmit = () => {
    setShowResult(true);
    setTimeout(() => {
      navigate("/next");
    }, 2000);
  };

  return (
    <div className="quiz-container">
      <h2 className="question-title">Question 1</h2>
      <p className="timer">Time left: {timeLeft}s</p>
      <p className="question-text">{questions[0].question}</p>
      <div className="options-container">
        {questions[0].options.map((option, index) => (
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
        <button onClick={handleSubmit} disabled={!selectedAnswer} className="submit-button">
          Submit
        </button>
      )}
      {showResult && (
        <p className={`result-message ${selectedAnswer === questions[0].correctAnswer ? "correct" : "incorrect"}`}>
          {selectedAnswer === questions[0].correctAnswer ? "Correct!" : "Incorrect!"}
        </p>
      )}
    </div>
  );
};

export default Quiz;
