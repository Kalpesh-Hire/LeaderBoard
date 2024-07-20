// src/components/Footer.js
import React, { useState, useEffect } from "react";
import "./Footer.css";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="footer">
      <div className="footer-content">
        <p>© 2024 Your Company - Current Time: {currentTime}</p>
      </div>
    </div>
  );
};

export default Footer;
