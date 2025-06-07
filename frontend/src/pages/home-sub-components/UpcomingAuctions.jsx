import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";

const UpcomingAuctions = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const today = new Date().toDateString();

  const auctionsStartingToday = allAuctions.filter(
    (item) => new Date(item.startTime).toDateString() === today
  );

  return (
    <section className="my-8">
      <h3 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
        Auctions For Today
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Highlight Box */}
        <div className="bg-[#161613] p-6 rounded-xl flex flex-col items-center justify-center text-center">
          <span className="bg-[#fdba88] text-white w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <RiAuctionFill size={24} />
          </span>
          <h4 className="text-[#fdba88] text-xl font-semibold mb-1">
            Auctions For
          </h4>
          <p className="text-white text-lg font-semibold">Today</p>
        </div>

        {/* Auction Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:col-span-2">
          {auctionsStartingToday.length > 0 ? (
            auctionsStartingToday.slice(0, 4).map((element) => (
              <Link
                key={element._id}
                to={`/auction/item/${element._id}`}
                className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm hover:shadow-lg transition"
              >
                <img
                  src={element.image?.url}
                  alt={element.title}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h5 className="font-semibold text-gray-800 truncate">
                    {element.title}
                  </h5>
                  <p className="text-sm text-gray-600">
                    Starting Bid:{" "}
                    <span className="text-[#d6482b] font-bold">
                      Rs. {element.startingBid}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    Starts at:{" "}
                    <span className="text-gray-800 font-medium text-[12px]">
                      {new Date(element.startTime).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No auctions start today.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default UpcomingAuctions;
