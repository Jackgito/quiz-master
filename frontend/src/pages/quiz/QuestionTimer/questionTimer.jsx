import React, { useState, useEffect } from 'react';
import './questionTimer.css';

export default function QuestionTimer({
  initialTime = 5,
  size = 200,
  strokeWidth = 10,
  onTimeUp
}) {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (timeLeft / initialTime) * circumference;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        }
        clearInterval(interval);
        if (onTimeUp) onTimeUp();  // Call onTimeUp when timer reaches 0
        return 0;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const getColor = (progress) => {
    if (progress >= 1) {
      return '#ff0000'; // Red when timer reaches 0
    } else if (progress < 0.5) {
      const r = Math.round(34 + (221 - 34) * (progress * 2));
      const g = Math.round(197 + (214 - 197) * (progress * 2));
      return `rgb(${r}, ${g}, 0)`;
    } else {
      const r = 221;
      const g = Math.round(214 - 214 * ((progress - 0.5) * 2));
      return `rgb(${r}, ${g}, 0)`;
    }
  };

  const progress = 1 - timeLeft / initialTime;
  const currentColor = getColor(progress);

  return (
    <div className="card">
      <div className="card-content">
        <div className="timer-container">
          <svg width={size} height={size} className="rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#e5e7eb"
              strokeWidth={strokeWidth}
            />
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={currentColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="animated-stroke"
            />
          </svg>
          <div className="time-left-display">
            <span className="time-left-text">{timeLeft}</span>
          </div>
        </div>
      </div>
    </div>
  );
}