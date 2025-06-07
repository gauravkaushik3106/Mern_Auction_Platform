import { postCommissionProof } from "@/store/slices/commissionSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const SubmitCommission = () => {
  const [proof, setProof] = useState("");
  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");

  const proofHandler = (e) => {
    const file = e.target.files[0];
    setProof(file);
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.commission);
  const handlePaymentProof = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("proof", proof);
    formData.append("amount", amount);
    formData.append("comment", comment);
    dispatch(postCommissionProof(formData));
  };

  return (
    <section className="w-full ml-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start bg-[#f9f9f9]">
      <div className="bg-white mx-auto w-full max-w-2xl px-6 py-8 rounded-2xl shadow-lg">
        <form
          className="flex flex-col gap-6 w-full"
          onSubmit={handlePaymentProof}
        >
          <h3 className="text-[#006b77] text-3xl font-bold text-center">Submit Payment Proof</h3>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-1">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-1">Payment Proof (Screenshot)</label>
            <input
              type="file"
              onChange={proofHandler}
              className="px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77] bg-white"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium mb-1">Comment</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              placeholder="Enter any additional information here..."
              className="px-4 py-2 border border-gray-300 rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
            ></textarea>
          </div>

          <button
            className="bg-[#006b77] hover:bg-[#004f58] text-white font-semibold text-lg py-2 rounded-md transition-all duration-300 mt-4"
            type="submit"
          >
            {loading ? "Uploading..." : "Upload Payment Proof"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default SubmitCommission;
