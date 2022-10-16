import React from "react";
import styles from "./Waiting_Timer.module.css";
import {Navigate} from 'react-router-dom';
import {useState} from "react";

const Timer = () => {
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
		const [redirect, setRedirect] = useState(false);
  
    const deadline = "16 October 2022 10:00:00 AM";
  
    const getTime = () => {
      const time = Date.parse(deadline) - Date.now();    
      console.log(time);
			if(time <= 0) {
				setRedirect(true)
				return;
			}
      setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
      setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
      setMinutes(Math.floor((time / 1000 / 60) % 60));
      setSeconds(Math.floor((time / 1000) % 60));
    };
  
    React.useEffect(() => {
      const interval = setInterval(() => getTime(deadline), 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className={styles.timer} role="timer">
				{redirect && <Navigate to="/quiz"/>}
        <div className={styles.col_4}>
          <div className={styles.box}>
            <span id={styles.day}>{days < 10 ? "0" + days : days}</span>
            <p className={styles.text}>Days</p>
          </div>
        </div>

        <div className={styles.col_4}>
          <div className={styles.box}>
            <span id={styles.hour}>{hours < 10 ? "0" + hours : hours}</span>
            <p className={styles.text}>Hours</p>
          </div>
        </div>

        <div className={styles.col_4}>
          <div className={styles.box}>
            <span id={styles.minute}>{minutes < 10 ? "0" + minutes : minutes}</span>
            <p className={styles.text}>Minutes</p>
          </div>
        </div>

        <div className={styles.col_4}>
          <div className={styles.box}>
            <span id={styles.second}>{seconds < 10 ? "0" + seconds : seconds}</span>
            <p className={styles.text}>Seconds</p>
          </div>
        </div>

      </div>
    );
  };

  export default Timer;
