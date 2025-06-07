import Spinner from "@/custom-components/Spinner";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);
  const navigateTo = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  if (loading) {
    return (
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center items-center">
        <Spinner />
      </section>
    );
  }

  return (
    <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-8 justify-start bg-gray-50">
      <div className="bg-white mx-auto w-full max-w-4xl px-8 py-8 rounded-xl shadow-sm border border-gray-100">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <img
            src={user?.profileImage?.url || "/imageHolder.jpg"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-teal-100"
          />
          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user?.userName}
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm font-medium">
              {user?.role}
            </span>
            <span className="text-gray-500 text-sm">
              Joined on {user?.createdAt?.substring(0, 10)}
            </span>
          </div>
        </div>

        {/* Personal Details */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Personal Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-500">
                Email
              </label>
              <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                {user?.email || "N/A"}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-500">
                Phone
              </label>
              <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                {user?.phone || "N/A"}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-gray-500">
                Address
              </label>
              <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                {user?.address || "N/A"}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Details (for Auctioneer) */}
        {user?.role === "Auctioneer" && user?.paymentMethods && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
              Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.paymentMethods.bankTransfer && (
                <>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-500">
                      Bank Name
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                      {user.paymentMethods.bankTransfer.bankName || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-500">
                      Bank Account (IBAN)
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                      {user.paymentMethods.bankTransfer.bankAccountNumber || "N/A"}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-sm font-medium text-gray-500">
                      Account Holder Name
                    </label>
                    <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                      {user.paymentMethods.bankTransfer.bankAccountName || "N/A"}
                    </div>
                  </div>
                </>
              )}
              {user.paymentMethods.paypal && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    PayPal Email
                  </label>
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                    {user.paymentMethods.paypal.paypalEmail || "N/A"}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Role-Specific Details */}
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-4 pb-2 border-b border-gray-200">
            Statistics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user?.role === "Auctioneer" && (
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-500">
                  Unpaid Commissions
                </label>
                <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                  {user?.unpaidCommission || "0"}
                </div>
              </div>
            )}
            {user?.role === "Bidder" && (
              <>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Auctions Won
                  </label>
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                    {user?.auctionsWon || "0"}
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-500">
                    Money Spent
                  </label>
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-800">
                    {user?.moneySpent || "0"}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;