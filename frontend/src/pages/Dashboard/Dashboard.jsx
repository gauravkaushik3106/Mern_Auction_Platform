import {
  clearAllSuperAdminSliceErrors,
  getAllPaymentProofs,
  getAllUsers,
  getMonthlyRevenue,
} from "@/store/slices/superAdminSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Spinner from "@/custom-components/Spinner";
import PaymentGraph from "./sub-components/PaymentGraph";
import BiddersAuctioneersGraph from "./sub-components/BiddersAuctioneersGraph";
import PaymentProofs from "./sub-components/PaymentProofs";
import AuctionItemDelete from "./sub-components/AuctionItemDelete";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading } = useSelector((state) => state.superAdmin);
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getMonthlyRevenue());
    dispatch(getAllUsers());
    dispatch(getAllPaymentProofs());
    dispatch(clearAllSuperAdminSliceErrors());
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated || user.role !== "Super Admin") {
      navigateTo("/");
    }
  }, [isAuthenticated, user, navigateTo]);

  if (loading) return <Spinner />;

  return (
    <div className="w-full pt-20 px-5 lg:pl-[320px] bg-gray-50 min-h-screen flex flex-col gap-12">
      <h1 className="text-[#D6482B] text-4xl md:text-5xl font-bold">
        Dashboard
      </h1>

      <section className="flex flex-col gap-12">
        {/* Payments Graph */}
        <div>
          <h2 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
            Monthly Total Payments Received
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <PaymentGraph />
          </div>
        </div>

        {/* Users Overview */}
        <div>
          <h2 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
            Users Overview
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <BiddersAuctioneersGraph />
          </div>
        </div>

        {/* Payment Proofs */}
        <div>
          <h2 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
            Payment Proofs
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
            <PaymentProofs />
          </div>
        </div>

        {/* Delete Auctions */}
        <div>
          <h2 className="text-[#111] text-2xl md:text-3xl font-semibold mb-4">
            Delete Items From Auction
          </h2>
          <div className="bg-white p-6 rounded-2xl shadow-md overflow-x-auto">
            <AuctionItemDelete />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
