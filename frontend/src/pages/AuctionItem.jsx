import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import { placeBid } from "@/store/slices/bidSlice";
import React, { useEffect, useState } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { RiAuctionFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const AuctionItem = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const [amount, setAmount] = useState(0);
  const handleBid = () => {
    const formData = new FormData();
    formData.append("amount", amount);
    dispatch(placeBid(id, formData));
    dispatch(getAuctionDetail(id));
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <div className="text-[16px] flex flex-wrap gap-2 items-center">
        <Link
          to="/"
          className="font-semibold transition-all duration-300 hover:text-teal-600"
        >
          Home
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <Link
          to={"/auctions"}
          className="font-semibold transition-all duration-300 hover:text-teal-600"
        >
          Auctions
        </Link>
        <FaGreaterThan className="text-stone-400" />
        <p className="text-stone-600">{auctionDetail.title}</p>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="flex gap-6 flex-col lg:flex-row mt-6">
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex gap-6 flex-col lg:flex-row">
              <div className="bg-white w-full lg:w-52 lg:h-52 flex justify-center items-center p-5 border shadow-sm rounded-md">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="object-contain max-h-48"
                />
              </div>
              <div className="flex flex-col justify-around pb-4">
                <h3 className="text-[#111] text-2xl font-bold mb-2 min-[480px]:text-3xl md:text-4xl">
                  {auctionDetail.title}
                </h3>
                <p className="text-lg md:text-xl font-medium">
                  Condition: <span className="text-teal-600 font-semibold">{auctionDetail.condition}</span>
                </p>
                <p className="text-lg md:text-xl font-medium">
                  Minimum Bid: <span className="text-teal-600 font-semibold">Rs.{auctionDetail.startingBid}</span>
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-2xl font-bold mt-4 mb-2 text-teal-700">Auction Item Description</h4>
              <hr className="border-t-[1px] border-t-stone-300 mb-4" />
              {auctionDetail.description &&
                auctionDetail.description.split(". ").map((element, index) => (
                  <li key={index} className="text-[17px] text-gray-700 mb-2">
                    {element}
                  </li>
                ))}
            </div>
            <div className="bg-teal-600 py-4 text-lg md:text-xl font-semibold px-4 flex items-center justify-between mt-6 rounded-md shadow">
              {Date.now() >= new Date(auctionDetail.startTime) &&
              Date.now() <= new Date(auctionDetail.endTime) ? (
                <>
                  <div className="flex gap-3 flex-col sm:flex-row sm:items-center">
                    <p className="text-white">Place Bid</p>
                    <input
                      type="number"
                      className="w-32 focus:outline-none md:text-[18px] p-2 rounded-md border border-gray-300"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                  <button
                    className="p-3 text-white bg-black rounded-full transition-all duration-300 hover:bg-[#222]"
                    onClick={handleBid}
                  >
                    <RiAuctionFill size={20} />
                  </button>
                </>
              ) : new Date(auctionDetail.startTime) > Date.now() ? (
                <p className="text-white font-semibold text-xl">
                  Auction has not started yet!
                </p>
              ) : (
                <p className="text-white font-semibold text-xl">
                  Auction has ended!
                </p>
              )}
            </div>
            <br></br>
          </div>

          <div className="flex-1">
            <header className="bg-teal-600 text-white py-4 text-2xl font-semibold px-4 rounded-t-md shadow-md">
              BIDS
            </header>
            <div className="bg-white px-4 min-h-fit lg:min-h-[650px] border-x border-b border-stone-300 rounded-b-md">
              {auctionBidders &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                auctionBidders.length > 0 ? (
                  auctionBidders.map((element, index) => (
                    <div
                      key={index}
                      className="py-4 flex items-center justify-between border-b border-gray-200"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-12 h-12 rounded-full hidden md:block"
                        />
                        <p className="text-[18px] font-semibold text-gray-800">
                          {element.userName}
                        </p>
                      </div>
                      <p
                        className={`text-[18px] font-bold ${
                          index === 0
                            ? "text-green-600"
                            : index === 1
                            ? "text-blue-600"
                            : index === 2
                            ? "text-yellow-600"
                            : "text-gray-600"
                        }`}
                      >
                        {index === 0
                          ? "1st"
                          : index === 1
                          ? "2nd"
                          : index === 2
                          ? "3rd"
                          : `${index + 1}th`}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 py-6">
                    No bids for this auction
                  </p>
                )
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <img
                  src="/notStarted.png"
                  alt="not-started"
                  className="w-full max-h-[650px] object-cover"
                />
              ) : (
                <img
                  src="/auctionEnded.png"
                  alt="ended"
                  className="w-full max-h-[650px] object-cover"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default AuctionItem;
