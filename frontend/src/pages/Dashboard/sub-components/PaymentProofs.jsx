import {
  deletePaymentProof,
  getSinglePaymentProofDetail,
  updatePaymentProof,
} from "@/store/slices/superAdminSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Drawer = ({ setOpenDrawer, openDrawer }) => {
  const { singlePaymentProof, loading } = useSelector(
    (state) => state.superAdmin
  );
  const [amount, setAmount] = useState(singlePaymentProof.amount || "");
  const [status, setStatus] = useState(singlePaymentProof.status || "");

  const dispatch = useDispatch();
  const handlePaymentProofUpdate = () => {
    dispatch(updatePaymentProof(singlePaymentProof._id, status, amount));
  };

  return (
    <section
      className={`fixed inset-0 transition-all duration-300 ${
        openDrawer && singlePaymentProof.userId ? "flex" : "hidden"
      } items-end bg-black bg-opacity-50`}
    >
      <div className="bg-white w-full sm:max-w-xl mx-auto rounded-t-2xl shadow-xl p-6">
        <h3 className="text-[#D6482B] text-2xl font-semibold text-center mb-2">
          Update Payment Proof
        </h3>
        <p className="text-gray-600 text-center mb-6">
          You can update payment status and amount below.
        </p>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium">User ID</label>
            <input
              type="text"
              value={singlePaymentProof.userId || ""}
              disabled
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006b77] bg-gray-100 text-gray-700"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006b77]"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006b77]"
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
              <option value="Settled">Settled</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-700 font-medium">Comment</label>
            <textarea
              rows={4}
              value={singlePaymentProof.comment || ""}
              disabled
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#006b77] bg-gray-100 text-gray-700"
            />
          </div>
          <Link
            to={singlePaymentProof.proof?.url || "#"}
            target="_blank"
            className="bg-[#D6482B] text-white py-2 rounded-md text-center font-semibold hover:bg-[#b8381e] transition"
          >
            View Payment Proof (Screenshot)
          </Link>
          <button
            type="button"
            onClick={handlePaymentProofUpdate}
            className="bg-blue-500 text-white py-2 rounded-md text-center font-semibold hover:bg-blue-700 transition"
          >
            {loading ? "Updating..." : "Update Payment Proof"}
          </button>
          <button
            type="button"
            onClick={() => setOpenDrawer(false)}
            className="bg-gray-400 text-white py-2 rounded-md text-center font-semibold hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </form>
      </div>
    </section>
  );
};

const PaymentProofs = () => {
  const { paymentProofs, singlePaymentProof } = useSelector(
    (state) => state.superAdmin
  );
  const [openDrawer, setOpenDrawer] = useState(false);
  const dispatch = useDispatch();

  const handlePaymentProofDelete = (id) => {
    dispatch(deletePaymentProof(id));
  };

  const handleFetchPaymentDetail = (id) => {
    dispatch(getSinglePaymentProofDetail(id));
  };

  useEffect(() => {
    if (singlePaymentProof && Object.keys(singlePaymentProof).length > 0) {
      setOpenDrawer(true);
    }
  }, [singlePaymentProof]);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white mt-4 border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left">User ID</th>
              <th className="py-3 px-4 text-left">Status</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {paymentProofs.length > 0 ? (
              paymentProofs.map((element) => (
                <tr key={element._id} className="border-t border-gray-100">
                  <td className="py-3 px-4">{element.userId}</td>
                  <td className="py-3 px-4">{element.status}</td>
                  <td className="py-3 px-4 flex space-x-3">
                    <button
                      onClick={() => handleFetchPaymentDetail(element._id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handlePaymentProofDelete(element._id)}
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
                  No payment proofs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Drawer setOpenDrawer={setOpenDrawer} openDrawer={openDrawer} />
    </>
  );
};

export default PaymentProofs;
