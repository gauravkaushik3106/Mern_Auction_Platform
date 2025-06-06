import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = ({ imgSrc, title, startingBid, startTime, endTime, id }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const startDifference = new Date(startTime) - now;
    const endDifference = new Date(endTime) - now;
    let timeLeft = {};

    if (startDifference > 0) {
      timeLeft = {
        type: "Starts In:",
        days: Math.floor(startDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((startDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((startDifference / 1000 / 60) % 60),
        seconds: Math.floor((startDifference / 1000) % 60),
      };
    } else if (endDifference > 0) {
      timeLeft = {
        type: "Ends In:",
        days: Math.floor(endDifference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((endDifference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((endDifference / 1000 / 60) % 60),
        seconds: Math.floor((endDifference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const formatTimeLeft = ({ days, hours, minutes, seconds }) => {
    const pad = (num) => String(num).padStart(2, "0");
    return `(${days} Days) ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  return (
    <Link
      to={`/auction/item/${id}`}
      className="group flex-grow basis-full rounded-2xl shadow-md bg-white transition-transform duration-300 hover:scale-[1.015] hover:shadow-xl sm:basis-56 lg:basis-60 2xl:basis-80"
    >
      <img
        src={imgSrc}
        alt={title}
        className="w-full aspect-[4/3] rounded-t-2xl object-cover"
      />
      <div className="px-4 pt-4 pb-4">
        <h5 className="font-semibold text-lg text-[#333] group-hover:text-[#d6482b] truncate mb-2">
          {title}
        </h5>
        {startingBid && (
          <p className="text-sm text-stone-600">
            Starting Bid:
            <span className="text-[#d6482b] font-bold ml-1">
              {startingBid}
            </span>
          </p>
        )}
        <p className="text-sm text-stone-600 mt-1">
          {timeLeft.type}
          {Object.keys(timeLeft).length > 1 ? (
            <span className="text-[#006b77] font-semibold ml-1">
              {formatTimeLeft(timeLeft)}
            </span>
          ) : (
            <span className="text-[#d6482b] font-semibold ml-1">Time's up!</span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default Card;
