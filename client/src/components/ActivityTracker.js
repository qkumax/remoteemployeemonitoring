import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

export default function ActivityTracker({ token }) {
  const [tracking, setTracking] = useState(false);
  const [activityId, setActivityId] = useState(null);
  const lastActiveRef = useRef(Date.now());
  const idleRef = useRef(0);
  const keyboardCount = useRef(0);
  const mouseCount = useRef(0);
  const interval = useRef(null);

  const startTracking = async () => {
    const res = await axios.post('http://localhost:4444/activity/start', {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setActivityId(res.data.activityId);
    setTracking(true);
    keyboardCount.current = 0;
    mouseCount.current = 0;
    idleRef.current = 0;
    lastActiveRef.current = Date.now();

    interval.current = setInterval(() => {
      const now = Date.now();
      const idleTime = now - lastActiveRef.current;
      if (idleTime > 60000) {
        idleRef.current += 60;
      }
    }, 10000);
  };

  const stopTracking = async () => {
    clearInterval(interval.current);
    setTracking(false);

    await axios.post('http://localhost:4444/activity/end', {
      activityId,
      keyboardActivity: keyboardCount.current,
      mouseActivity: mouseCount.current,
      idleDuration: idleRef.current,
      usedApps: [],
      screenshots: []
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  useEffect(() => {
    const onMouse = () => {
      mouseCount.current += 1;
      lastActiveRef.current = Date.now();
    };

    const onKeyboard = () => {
      keyboardCount.current += 1;
      lastActiveRef.current = Date.now();
    };

    if (tracking) {
      window.addEventListener('mousemove', onMouse);
      window.addEventListener('keydown', onKeyboard);
    }

    return () => {
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('keydown', onKeyboard);
    };
  }, [tracking]);

  return (
    <div>
      {tracking ? (
        <button onClick={stopTracking}>🛑 Stop</button>
      ) : (
        <button onClick={startTracking}>▶️ Start</button>
      )}
    </div>
  );
}
