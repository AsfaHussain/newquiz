import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz/Quiz";
import NextPages from "./components/Quiz/NextPages";

const Result = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px",color:"white" }}>
      <h2>Quiz Completed!</h2>
      <p>Thank you for participating.</p>
      <button onClick={() => window.location.href = "/"}>Restart Quiz</button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/next" element={<NextPages />} />
        <Route path="/result" element={<Result />} /> 
      </Routes>
    </Router>
  );
}

export default App;
