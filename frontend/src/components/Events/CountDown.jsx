import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";

const CountDown = ({ data }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      typeof timeLeft.days === 'undefined' &&
      typeof timeLeft.hours === 'undefined' &&
      typeof timeLeft.minutes === 'undefined' &&
      typeof timeLeft.seconds === 'undefined'
    ) {
      axios.delete(`${server}/event/delete-shop-event/${data._id}`);
    }
    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data.Finish_Date) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  }

  const timerComponents = Object.keys(timeLeft).map((interval) => {
    if (!timeLeft[interval]) {
      return null;
    }

    return (
      <div key={interval} className="inline-flex flex-col items-center mx-1">
        <div className="bg-blue-100 text-blue-600 font-bold text-sm px-2 py-1 rounded-lg min-w-[2.5rem] text-center">
          {timeLeft[interval]}
        </div>
        <span className="text-xs text-gray-500 mt-1 capitalize">
          {interval}
        </span>
      </div>
    );
  });

  return (
    <div className="flex items-center justify-center">
      {timerComponents.length ? (
        <div className="flex items-center space-x-1">
          {timerComponents}
        </div>
      ) : (
        <span className="text-red-500 text-sm font-medium bg-red-50 px-3 py-1 rounded-full">
          Time's Up
        </span>
      )}
    </div>
  );
};

export default CountDown;
