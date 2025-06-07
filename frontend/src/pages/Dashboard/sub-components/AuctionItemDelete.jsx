import { deleteAuctionItem } from "@/store/slices/superAdminSlice";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AuctionItemDelete = () => {
  const { allAuctions } = useSelector((state) => state.auction);
  const dispatch = useDispatch();

  const handleAuctionDelete = (id) => {
    dispatch(deleteAuctionItem(id));
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Image</th>
            <th className="py-3 px-4 text-left">Title</th>
            <th className="py-3 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {allAuctions.length > 0 ? (
            allAuctions.map((element) => (
              <tr key={element._id} className="border-t border-gray-100">
                <td className="py-3 px-4">
                  <img
                    src={element.image?.url}
                    alt={element.title}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="py-3 px-4">{element.title}</td>
                <td className="py-3 px-4 flex space-x-3">
                  <Link
                    to={`/auction/details/${element._id}`}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleAuctionDelete(element._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="py-4 text-center text-gray-600">
                No auctions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AuctionItemDelete;
