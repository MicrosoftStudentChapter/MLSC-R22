import React from 'react';
import { useState, useEffect } from 'react';
// import { useTimer } from 'react-timer-hook';
import styles from './quiztimer.module.css'

const Quiz_Timer = ({ submit }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  // const deadline = new Date(Date.now() + 15 * 60000);
  const deadline = new Date(Date.now() + 60000);
  // const deadline = Date.now()
  // deadline.setMinutes(deadline.getMinutes() + 15)

  const getTime = () => {
    const time = Date.parse(deadline) - Date.now();
    if (time <= 0) {
      submit();
    } else {
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };


  useEffect(() => {
    const interval = setInterval(() => getTime(deadline), 1000);
    if (minutes === 0)
      return () => clearInterval(interval);
  }, []);



  return (
    <div className={styles.timer} role="timer">
      <div className={styles.col_4}>
        <div className={styles.box}>
          <p id="minute">{minutes < 10 ? "0" + minutes : minutes}</p>
          <span className={styles.text}>Minutes</span>
        </div>
      </div>
      <div className={styles.col_4}>
        <div className={styles.box}>
          <p id="second">{seconds < 10 ? "0" + seconds : seconds}</p>
          <span className={styles.text}>Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default Quiz_Timer;