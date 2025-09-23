// Clock.js
import { useState, useEffect } from "react";

// Countdown hook
function useCountdownToMidnight() {
  function getTargetDateForToday() {
    const today = new Date();
    today.setHours(23, 59, 0, 0);
    return today.getTime();
  }

  const targetDate = getTargetDateForToday();

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

// Component using the countdown
function Clock() {
  const timeLeft = useCountdownToMidnight();

  return (
    <table className="hidden md:block md:mx-3.5">
      <thead>
        <tr>
          <th className="text-xs font-medium">Days</th>
          <th></th>
          <th className="text-xs font-medium">Hours</th>
          <th></th>
          <th className="text-xs font-medium">Minutes</th>
          <th></th>
          <th className="text-xs font-medium">Seconds</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-xl lg:text-3xl font-bold text-center">{timeLeft.days}</td>
          <td className="flex flex-col justify-evenly h-8 w-8">
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1"></span>
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1"></span>
          </td>
          <td className="text-xl lg:text-3xl font-bold text-center">{timeLeft.hours}</td>
          <td className="flex flex-col justify-evenly h-8 w-8">
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1"></span>
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1"></span>
          </td>
          <td className="text-xl lg:text-3xl font-bold text-center">{timeLeft.minutes}</td>
          <td className="flex flex-col justify-evenly h-8 w-8">
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1 "></span>
            <span className="rounded-3xl self-center bg-[#db4444] w-1 h-1"></span>
          </td>
          <td className="text-xl lg:text-3xl font-bold text-center">{timeLeft.seconds}</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Clock;

// 👉 This is the export you can use in other components
export { useCountdownToMidnight };
