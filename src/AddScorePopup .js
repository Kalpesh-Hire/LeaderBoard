// src/components/AddScorePopup.js
import React, { useState, useEffect } from "react";
import "./AddScorePopup.css";

const formatTime = (date) => {
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}::${milliseconds}`;
};

const AddScorePopup = ({ isOpen, onClose, onAdd }) => {
  const [username, setUsername] = useState("");
  const [score, setScore] = useState("");
  const [currentTime, setCurrentTime] = useState(formatTime(new Date()));

  useEffect(() => {
    if (isOpen) {
      const timer = setInterval(() => {
        setCurrentTime(formatTime(new Date()));
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    onAdd({ username, score: currentTime });
    setUsername("");
    setScore("");
    onClose();
  };

  return (
    isOpen && (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Add Score</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Score (MM:SS::MSS)"
            value={currentTime}
            readOnly
          />
          <button onClick={handleSubmit}>Add</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    )
  );
};

export default AddScorePopup;
