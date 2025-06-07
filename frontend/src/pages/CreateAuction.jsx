import { createAuction } from "@/store/slices/auctionSlice";
import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

const CreateAuction = () => {
  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [startingBid, setStartingBid] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const auctionCategories = [
    "Electronics",
    "Furniture",
    "Art & Antiques",
    "Jewelry & Watches",
    "Automobiles",
    "Real Estate",
    "Collectibles",
    "Fashion & Accessories",
    "Sports Memorabilia",
    "Books & Manuscripts",
  ];

  const imageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(file);
      setImagePreview(reader.result);
    };
  };

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auction);

  const handleCreateAuction = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("condition", condition);
    formData.append("startingBid", startingBid);
    formData.append("startTime", startTime);
    formData.append("endTime", endTime);
    dispatch(createAuction(formData));
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const navigateTo = useNavigate();
  useEffect(() => {
    if (!isAuthenticated || user.role !== "Auctioneer") {
      navigateTo("/");
    }
  }, [isAuthenticated]);

  return (
    <article className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col">
      <h1 className="text-[#006b77] text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
        Create Auction
      </h1>
      <div className="bg-white mx-auto w-full max-w-4xl h-auto px-4 flex flex-col gap-6 items-center py-6 justify-center rounded-2xl shadow-lg">
        <form className="flex flex-col gap-6 w-full" onSubmit={handleCreateAuction}>
          <p className="font-semibold text-2xl text-gray-800">Auction Details</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
              >
                <option value="">Select Category</option>
                {auctionCategories.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">Condition</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
              >
                <option value="">Select Condition</option>
                <option value="New">New</option>
                <option value="Used">Used</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">Starting Bid</label>
              <input
                type="number"
                value={startingBid}
                onChange={(e) => setStartingBid(e.target.value)}
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77]"
              rows={6}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">Start Time</label>
              <DatePicker
                selected={startTime}
                onChange={(date) => setStartTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77] w-full"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">End Time</label>
              <DatePicker
                selected={endTime}
                onChange={(date) => setEndTime(date)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                className="px-3 py-2 border rounded-md text-base focus:outline-none focus:ring-2 focus:ring-[#006b77] w-full"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-gray-600 font-medium mb-2">Auction Image</label>
            <label htmlFor="dropzone-file" className="cursor-pointer w-full border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100">
              {imagePreview ? (
                <img src={imagePreview} alt={title} className="w-32 h-auto object-cover rounded-md" />
              ) : (
                <>
                  <svg className="w-10 h-10 text-gray-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L4 7m3-3l3 3m-3 5v4m8-5h2m2 0h2M5 12h2" />
                  </svg>
                  <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-400">JPG, PNG, SVG (max 800x400px)</p>
                </>
              )}
              <input id="dropzone-file" type="file" className="hidden" onChange={imageHandler} />
            </label>
          </div>

          <button className="mt-6 w-full bg-[#006b77] hover:bg-[#004f59] text-white text-lg font-semibold py-2 rounded-md transition-all duration-300">
            {loading ? "Creating Auction..." : "Create Auction"}
          </button>
        </form>
      </div>
    </article>
  );
};

export default CreateAuction;
