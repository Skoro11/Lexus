import { useState, useEffect } from "react";

function Clock() {
function getTargetDateForToday() {
  const today = new Date();
  today.setHours(23, 59, 0, 0); // Set the time to 23:59:00
  return today.getTime();
}

  // Set the target date (e.g., January 18, 2025 at 17:30)
  const targetDate = getTargetDateForToday();

  // State to hold the remaining time
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Function to update the time remaining
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        // If the countdown reaches zero, stop updating
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      // Calculate days, hours, minutes, and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      // Update state with the remaining time, formatting with two digits
      setTimeLeft({
        days: days.toString().padStart(2, "0"), // pad with 0 if single digit
        hours: hours.toString().padStart(2, "0"), // pad with 0 if single digit
        minutes: minutes.toString().padStart(2, "0"), // pad with 0 if single digit
        seconds: seconds.toString().padStart(2, "0"), // pad with 0 if single digit
      });
    };

    // Update the countdown every second
    const intervalId = setInterval(updateCountdown, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [targetDate]);

  // Return just the time values
  return {
    days: timeLeft.days,
    hours: timeLeft.hours,
    minutes: timeLeft.minutes,
    seconds: timeLeft.seconds,
  };
}

export default Clock;
