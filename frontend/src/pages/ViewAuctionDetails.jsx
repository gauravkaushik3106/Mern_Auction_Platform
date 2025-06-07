import Spinner from "@/custom-components/Spinner";
import { getAuctionDetail } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { FaGreaterThan } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewAuctionDetails = () => {
  const { id } = useParams();
  const { loading, auctionDetail, auctionBidders } = useSelector(
    (state) => state.auction
  );
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated || user.role === "Bidder") {
      navigateTo("/");
    }
    if (id) {
      dispatch(getAuctionDetail(id));
    }
  }, [isAuthenticated]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col bg-gray-50 min-h-screen py-6">
      {/* Breadcrumb Navigation */}
      <div className="text-sm flex flex-wrap gap-2 items-center mb-6">
        <Link
          to="/"
          className="font-medium text-gray-600 hover:text-teal-600 transition-colors"
        >
          Home
        </Link>
        <FaGreaterThan className="text-gray-400 text-xs" />
        <Link
          to="/view-my-auctions"
          className="font-medium text-gray-600 hover:text-teal-600 transition-colors"
        >
          My Auctions
        </Link>
        <FaGreaterThan className="text-gray-400 text-xs" />
        <span className="text-gray-800 font-medium">{auctionDetail.title}</span>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Spinner />
        </div>
      ) : (
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Auction Details Section */}
          <div className="flex-1 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className="w-full lg:w-48 h-48 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                <img
                  src={auctionDetail.image?.url}
                  alt={auctionDetail.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  {auctionDetail.title}
                </h1>
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="bg-teal-50 px-3 py-1 rounded-full">
                    <span className="text-teal-700 font-medium">
                      {auctionDetail.condition}
                    </span>
                  </div>
                  <div className="bg-blue-50 px-3 py-1 rounded-full">
                    <span className="text-blue-700 font-medium">
                      Rs. {auctionDetail.startingBid}
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">Start:</span>
                    <span className="font-medium">
                      {new Date(auctionDetail.startTime).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">End:</span>
                    <span className="font-medium">
                      {new Date(auctionDetail.endTime).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-200">
                Description
              </h2>
              <ul className="space-y-2 pl-5">
                {auctionDetail.description &&
                  auctionDetail.description.split(". ").map((element, index) => (
                    <li key={index} className="text-gray-700 list-disc">
                      {element}
                    </li>
                  ))}
              </ul>
            </div>
          </div>

          {/* Bids Section */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <header className="bg-teal-600 py-4 px-6">
              <h2 className="text-xl font-semibold text-white">Bids</h2>
            </header>
            
            <div className="p-6">
              {auctionBidders &&
              auctionBidders.length > 0 &&
              new Date(auctionDetail.startTime) < Date.now() &&
              new Date(auctionDetail.endTime) > Date.now() ? (
                <div className="space-y-4">
                  {auctionBidders.map((element, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={element.profileImage}
                          alt={element.userName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium">{element.userName}</span>
                      </div>
                      <span className="font-bold">Rs. {element.amount}</span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          index === 0
                            ? "bg-green-100 text-green-800"
                            : index === 1
                            ? "bg-blue-100 text-blue-800"
                            : index === 2
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {index + 1}
                        {index === 0 ? "st" : index === 1 ? "nd" : index === 2 ? "rd" : "th"}
                      </span>
                    </div>
                  ))}
                </div>
              ) : Date.now() < new Date(auctionDetail.startTime) ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <img
                    src="/notStarted.png"
                    alt="Auction not started"
                    className="w-64 h-64 object-contain mb-4"
                  />
                  <p className="text-gray-600 text-lg font-medium">
                    Auction has not started yet
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12">
                  <img
                    src="/auctionEnded.png"
                    alt="Auction ended"
                    className="w-64 h-64 object-contain mb-4"
                  />
                  <p className="text-gray-600 text-lg font-medium">
                    Auction has ended
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ViewAuctionDetails;