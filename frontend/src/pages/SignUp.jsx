import { register } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [profileImagePreview, setProfileImagePreview] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("role", role);
    formData.append("profileImage", profileImage);
    role === "Auctioneer" &&
      (formData.append("bankAccountName", bankAccountName),
      formData.append("bankAccountNumber", bankAccountNumber),
      formData.append("bankName", bankName),
      formData.append("paypalEmail", paypalEmail));
    dispatch(register(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, loading, isAuthenticated]);

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProfileImagePreview(reader.result);
      setProfileImage(file);
    };
  };

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gray-50">
        <div className="bg-white mx-auto w-full max-w-4xl h-auto px-8 py-8 flex flex-col gap-6 items-center justify-center rounded-lg shadow-md">
          <h1 className="text-teal-600 text-3xl font-bold mb-4">
            Register
          </h1>
          <form className="flex flex-col gap-6 w-full" onSubmit={handleRegister}>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="font-semibold text-xl text-gray-800 mb-4">
                Personal Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="">Select Role</option>
                    <option value="Auctioneer">Auctioneer</option>
                    <option value="Bidder">Bidder</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
              </div>
              <div className="mt-4 flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  Profile Image
                </label>
                <div className="flex items-center gap-4">
                  <img
                    src={
                      profileImagePreview
                        ? profileImagePreview
                        : "/imageHolder.jpg"
                    }
                    alt="profileImagePreview"
                    className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                  />
                  <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                    Choose File
                    <input
                      type="file"
                      onChange={imageHandler}
                      className="hidden"
                      accept="image/*"
                    />
                  </label>
                  <span className="text-sm text-gray-500">
                    {profileImage ? "File selected" : "No file chosen"}
                  </span>
                </div>
              </div>
            </div>

            {role === "Auctioneer" && (
              <div className="bg-gray-50 p-6 rounded-lg">
                <label className="font-semibold text-xl text-gray-800 mb-2 flex flex-col">
                  Payment Method Details
                  <span className="text-sm font-normal text-gray-500 mt-1">
                    Fill payment details for Auctioneer registration
                  </span>
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      Bank Details
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <select
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="">Select Your Bank</option>
                        <option value="State Bank of India">State Bank of India</option>
                        <option value="Union Bank of India">Union Bank of India</option>
                        <option value="Bank of Baroda">Bank of Baroda</option>
                        <option value="YES Bank">YES Bank</option>
                      </select>
                      <input
                        type="text"
                        value={bankAccountNumber}
                        placeholder="IFSC"
                        onChange={(e) => setBankAccountNumber(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                      <input
                        type="text"
                        value={bankAccountName}
                        placeholder="Bank Account Name"
                        onChange={(e) => setBankAccountName(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="col-span-2">
                    <label className="text-sm font-medium text-gray-700 mb-1">
                      PayPal Email
                    </label>
                    <input
                      type="email"
                      value={paypalEmail}
                      placeholder="PayPal Email"
                      onChange={(e) => setPaypalEmail(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            )}

            <button
              className="bg-teal-600 hover:bg-teal-500 transition-colors duration-300 text-white font-medium py-3 px-6 rounded-md text-lg w-full max-w-md mx-auto mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignUp;