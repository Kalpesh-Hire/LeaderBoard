// src/components/Leaderboard.js
import React, { useEffect, useRef } from "react";
import "./Leaderboard.css";

// Helper function to convert score string to 24-hour time format
const formatTime = (score) => {
  const [minutes, seconds, milliseconds] = score.split(/[:|::]/).map(Number);
  const totalMilliseconds =
    minutes * 60000 + seconds * 1000 + milliseconds * 10;
  const date = new Date(totalMilliseconds);

  // Extract hours, minutes, and seconds
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const mins = date.getUTCMinutes().toString().padStart(2, "0");
  const secs = date.getUTCSeconds().toString().padStart(2, "0");

  return `${hours}:${mins}:${secs}`;
};

const Leaderboard = ({ scores, recentScore }) => {
  const scrollToIndexRef = useRef(null);

  useEffect(() => {
    if (scrollToIndexRef.current) {
      scrollToIndexRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
    const items = document.querySelectorAll(".leaderboard-item");
    items.forEach((item) => {
      item.classList.add("enter");
    });
  }, [scores]);

  const getListItemRef = (index) => {
    return index === scores.length - 1 ? scrollToIndexRef : null;
  };

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <h2>Top 10 Scores</h2>
      <div className="leaderboard-headers">
        <span className="header rank-header">Rank</span>
        <span className="header name-header">Name</span>
        <span className="header time-header">Time</span>
      </div>
      <ul>
        {scores.length > 0 ? (
          scores.map((score, index) => (
            <li
              key={index}
              ref={getListItemRef(index)}
              className="leaderboard-item"
            >
              <span className="rank">{index + 1}</span>
              <span className="username">{score.username}</span>
              <span className="score">{formatTime(score.score)}</span>
            </li>
          ))
        ) : (
          <li>No scores available</li>
        )}
      </ul>
      {recentScore && (
        <div className="recent-entry">
          <h2>Recent Entry</h2>
          <div className="leaderboard-item recent">
            <span className="rank">NA</span>
            <span className="username">{recentScore.username}</span>
            <span className="score">{formatTime(recentScore.score)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
