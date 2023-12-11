import React, { useEffect, useState } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";


const Timer = () => {
  const [initialMinutes, setInitialMinutes] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [formattedTime, setFormattedTime] = useState('00:00:00');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timerInterval;

    if (isPlaying && remainingTime > 0) {
      timerInterval = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(0, prevTime - 1));
      }, 1000);
    }

    return () => clearInterval(timerInterval);
  }, [isPlaying, remainingTime]);

  useEffect(() => {
    const hours = Math.floor(remainingTime / 3600);
    const remainingMinutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;
    const formattedHours = String(hours).padStart(2, '0');
    const formattedRemainingMinutes = String(remainingMinutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const formattedTimeString = `${formattedHours}:${formattedRemainingMinutes}:${formattedSeconds}`;
    setFormattedTime(formattedTimeString);
  }, [remainingTime]);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setRemainingTime(Math.max(0, inputValue * 60));
    setInitialMinutes(Math.max(0, inputValue));
  };

  const handlePlayClick = () => {
    if (initialMinutes === 0) {
      alert('Please enter the mintue to start count down');
    } else {
      setIsPlaying(true);
    }
  };

  const handlePauseClick = () => {
    setIsPlaying(false);
  };

  const handleResetClick = () => {
    setIsPlaying(false);
    setRemainingTime(0);
    setInitialMinutes(0);
  };

  return (
    <div className='timer-container'>
      <div className='timer-wrapper'>
        <h5 className='timer-text'>Enter Minutes</h5>
        <input type="number" className='timer-input' value={initialMinutes} onChange={handleInputChange} />
      </div>
      <div className='timer-display'>
        {isPlaying ? (
          <FaPauseCircle className='play-icon' onClick={handlePauseClick} />
        ) : (
          <FaPlayCircle className='play-icon' fill='#04aacd' onClick={handlePlayClick} />
        )}
        <span className='timer-text'>{formattedTime}</span>
      </div>
      <div className='reset-div' onClick={handleResetClick} >
        <button className='reset-button'>RESET</button>

      </div>
    </div>
  );
};

export default Timer;
