import CardTwo from "@/custom-components/CardTwo";
import Spinner from "@/custom-components/Spinner";
import { getMyAuctionItems } from "@/store/slices/auctionSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewMyAuctions = () => {
  const { myAuctions, loading } = useSelector((state) => state.auction);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
    dispatch(getMyAuctionItems());
  }, [dispatch, isAuthenticated, navigateTo, user.role]);

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen bg-[#f9f9f9]">
      <h1 className="text-[#006b77] text-4xl font-extrabold mb-8 border-b-4 border-[#006b77] inline-block pb-2">
        My Auctions
      </h1>

      {loading ? (
        <Spinner />
      ) : (
        <div
          className={`${
            myAuctions.length > 2 ? "flex-grow" : ""
          } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
        >
          {myAuctions.length > 0 ? (
            myAuctions.map((element) => (
              <CardTwo
                title={element.title}
                startingBid={element.startingBid}
                endTime={element.endTime}
                startTime={element.startTime}
                imgSrc={element.image?.url}
                id={element._id}
                key={element._id}
              />
            ))
          ) : (
            <div className="text-center col-span-full mt-12">
              <h3 className="text-[#999] text-2xl font-medium">
                You have not posted any auction.
              </h3>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ViewMyAuctions;
