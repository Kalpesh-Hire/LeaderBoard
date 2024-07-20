// src/App.js
import React, { useState } from "react";
import "./App.css";
import Leaderboard from "./Leaderboard ";
import AddScorePopup from "./AddScorePopup ";
import Footer from "./Footer ";

const App = () => {
  const [scores, setScores] = useState([]);
  const [recentScore, setRecentScore] = useState(null); // New state for recent score
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleAddScore = (newScore) => {
    setScores((prevScores) => {
      const parseScore = (scoreStr) => {
        const [minutes, seconds, milliseconds] = scoreStr
          .split(/[:|::]/)
          .map(Number);
        return minutes * 60000 + seconds * 1000 + milliseconds * 10;
      };

      const updatedScores = [...prevScores, newScore]
        .sort((a, b) => parseScore(a.score) - parseScore(b.score))
        .slice(0, 10);

      return updatedScores;
    });

    setRecentScore(newScore); // Update recent score
    setIsPopupOpen(false);
  };

  return (
    <div className="App">
      <Leaderboard scores={scores} recentScore={recentScore} />
      <button className="add-score-btn" onClick={() => setIsPopupOpen(true)}>
        Add Score
      </button>
      <AddScorePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onAdd={handleAddScore}
      />
      <Footer />
    </div>
  );
};

export default App;
