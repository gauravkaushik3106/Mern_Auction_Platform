import React from "react";
import { useSelector } from "react-redux";
import Card from "@/custom-components/Card";

const FeaturedAuctions = () => {
  const { allAuctions, loading } = useSelector((state) => state.auction);

  if (loading) return null; // or a Spinner if you prefer

  return (
    <section className="my-8">
      <h3 className="text-[#006b77] text-2xl md:text-3xl font-semibold mb-4">
        Featured Auctions
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allAuctions.slice(0, 8).map((element) => (
          <Card
            key={element._id}
            id={element._id}
            title={element.title}
            imgSrc={element.image?.url}
            startTime={element.startTime}
            endTime={element.endTime}
            startingBid={element.startingBid}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedAuctions;
