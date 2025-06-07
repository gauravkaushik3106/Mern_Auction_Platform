import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import FeaturedAuctions from "./home-sub-components/FeaturedAuctions";
import UpcomingAuctions from "./home-sub-components/UpcomingAuctions";
import Leaderboard from "./home-sub-components/Leaderboard";
import Spinner from "@/custom-components/Spinner";

const Home = () => {
  const howItWorks = [
    { title: "Post Items", description: "Auctioneers list items for bidding." },
    { title: "Place Bids", description: "Bidders compete to win top deals." },
    {
      title: "Win Notification",
      description: "Winners are notified instantly via email.",
    },
    {
      title: "Secure Payment",
      description: "Winners pay;  auctioneer pays 5% fee.",
    },
  ];

  const { isAuthenticated } = useSelector((state) => state.user);
  return (
    <>
      <section className="w-full ml-0 px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-teal-50">
        <div>
          <p className="text-teal-700 font-semibold text-xl mb-6">
            Trusted. Transparent. Triumphant.
          </p>
          <h1 className="text-gray-900 text-3xl font-bold mb-2 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Transparent Auctions
          </h1>
          <h1 className="text-teal-600 text-3xl font-extrabold mb-6 min-[480px]:text-4xl md:text-6xl xl:text-7xl 2xl:text-8xl">
            Be the Highest Bidder
          </h1>

          <div className="flex gap-4 my-8">
            {!isAuthenticated && (
              <>
                <Link
                  to="/sign-up"
                  className="bg-teal-600 font-semibold hover:bg-teal-700 rounded-md px-8 py-2 text-white transition-all duration-300 shadow-sm"
                >
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="text-teal-600 border-2 border-teal-600 font-semibold hover:bg-teal-100 hover:text-teal-800 rounded-md px-8 py-2 transition-all duration-300 shadow-sm"
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h3 className="text-gray-800 text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl">
            How It Works
          </h3>
          <div className="flex flex-col gap-4 md:flex-row md:flex-wrap w-full">
            {howItWorks.map((element) => (
              <div
                key={element.title}
                className="bg-white shadow hover:shadow-lg transition-all duration-300 flex flex-col gap-1 p-4 rounded-lg md:w-[48%] lg:w-[47%] 2xl:w-[24%]"
              >
                <h5 className="font-bold text-teal-700 text-lg">{element.title}</h5>
                <p className="text-gray-700 text-sm">{element.description}</p>
              </div>
            ))}
          </div>
        </div>

        <FeaturedAuctions />
        <UpcomingAuctions />
        <Leaderboard />
      </section>
    </>
  );
};

export default Home;
