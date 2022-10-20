import React from "react";
import { useState, useEffect } from "react";
import styles from "./quiztimer.module.css";

const Quiz_Timer = ({ submit }) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [checked, setChecked] = useState(false);

  let deadline = new Date(Date.now() + 10 * 60000);
  let interval;
  const getTime = async () => {
    if (
      (localStorage.getItem("startTime") !== null ||
        localStorage.getItem("startTime") !== undefined) &&
      !checked
    ) {
      deadline = new Date(
        parseInt(localStorage.getItem("startTime", Date.now())) + 10 * 60000
      );
      setChecked(true);
    }
    const time = Date.parse(deadline) - Date.now();
    console.log(time);
    if (time <= 0) {
      await submit(true);
      clearInterval(interval);
      return;
    } else {
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("startTime") === null ||
      localStorage.getItem("startTime") === undefined
    ) {
      localStorage.setItem("startTime", Date.now());
    }
    interval = setInterval(() => getTime(deadline), 1000);
    if (minutes === 0) return () => clearInterval(interval);
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
