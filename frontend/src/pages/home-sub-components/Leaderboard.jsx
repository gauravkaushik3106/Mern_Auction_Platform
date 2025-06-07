import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Leaderboard = () => {
  const { leaderboard } = useSelector((state) => state.user);

  return (
    <section className="my-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <h3 className="text-[#111] text-2xl md:text-3xl font-semibold">
          Top 10
        </h3>
        <h3 className="text-teal-600 text-2xl md:text-3xl font-semibold">
          Bidders Leaderboard
        </h3>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">#</th>
              <th className="py-3 px-5 text-left">Profile</th>
              <th className="py-3 px-5 text-left">Username</th>
              <th className="py-3 px-5 text-left">Bid Expenditure</th>
              <th className="py-3 px-5 text-left">Auctions Won</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {leaderboard.slice(0, 10).map((element, index) => (
              <tr
                key={element._id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-5 text-left font-medium">{index + 1}</td>
                <td className="py-3 px-5 text-left">
                  <img
                    src={element.profileImage?.url}
                    alt={element.userName}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                </td>
                <td className="py-3 px-5 text-left">{element.userName}</td>
                <td className="py-3 px-5 text-left">{element.moneySpent}</td>
                <td className="py-3 px-5 text-left">{element.auctionsWon}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Link
        to="/leaderboard"
        className="mt-6 inline-block w-full sm:w-auto text-center border-2 border-gray-300 text-gray-700 font-semibold py-2 px-6 rounded-md hover:border-gray-500 hover:text-gray-900 transition"
      >
        Go to Leaderboard
      </Link>
    </section>
  );
};

export default Leaderboard;
