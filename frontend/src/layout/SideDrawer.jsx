import React, { useState } from "react";
import { RiAuctionFill } from "react-icons/ri";
import { MdLeaderboard, MdDashboard } from "react-icons/md";
import { SiGooglesearchconsole } from "react-icons/si";
import { BsFillInfoSquareFill } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircleOutline, IoIosCreate } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/userSlice";
import { Link, useNavigate } from "react-router-dom";

const SideDrawer = () => {
  const [show, setShow] = useState(false);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  const navigate=useNavigate();
  const handleNavigate=(path)=>{
    navigate(path);
    setShow(false);
  }

  return (
    <>
      <div
        onClick={() => setShow(!show)}
        className="fixed right-5 top-5 bg-teal-600 text-white text-3xl p-2 rounded-md hover:bg-teal-700 lg:hidden shadow-md"
      >
        <GiHamburgerMenu />
      </div>
      <div
        className={`w-full sm:w-[300px] bg-slate-100 h-full fixed top-0 ${
          show ? "left-0" : "left-[-100%]"
        } transition-all duration-150 p-4 flex flex-col justify-between lg:left-0 border-r-[1px] border-slate-300 z-50`}
      >
        <div className="relative">
          <div onClick={()=>handleNavigate("/")}>
            <h4 className="text-2xl font-bold mb-4 text-slate-800 hover:cursor-pointer">
              Suh<span className="text-teal-600">Bidz</span>
            </h4>
          </div>
          <ul className="flex flex-col gap-3">
            <li>
              <div
                onClick={()=>handleNavigate("/auctions")}
                className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
              >
                <RiAuctionFill /> Auctions
              </div>
            </li>
            <li>
              <div
                onClick={()=>handleNavigate("/leaderboard")}
                className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
              >
                <MdLeaderboard /> Leaderboard
              </div>
            </li>
            {isAuthenticated && user && user.role === "Auctioneer" && (
              <>
                <li>
                  <div
                    onClick={()=>handleNavigate("/submit-commission")}
                    className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
                  >
                    <FaFileInvoiceDollar /> Submit Commission
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handleNavigate("/create-auction")}
                    className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
                  >
                    <IoIosCreate /> Create Auction
                  </div>
                </li>
                <li>
                  <div
                    onClick={()=>handleNavigate("/view-my-auctions")}
                    className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
                  >
                    <FaEye /> View My Auctions
                  </div>
                </li>
              </>
            )}
            {isAuthenticated && user && user.role === "Super Admin" && (
              <li>
                <div
                  onClick={()=>handleNavigate("/dashboard")}
                  className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
                >
                  <MdDashboard /> Dashboard
                </div>
              </li>
            )}
          </ul>
          {!isAuthenticated ? (
            <div className="my-4 flex gap-2">
              <div
                onClick={()=>handleNavigate("/sign-up")}
                className="bg-teal-600 font-semibold hover:bg-teal-700 text-white text-lg py-1 px-4 rounded-md transition cursor-pointer"
              >
                Sign Up
              </div>
              <div
                onClick={()=>handleNavigate("/login")}
                className="text-teal-700 border-2 border-teal-600 hover:bg-teal-50 font-semibold text-lg py-1 px-4 rounded-md transition cursor-pointer"
              >
                Login
              </div>
            </div>
          ) : (
            <div className="my-4 flex gap-4 w-fit" onClick={handleLogout}>
              <button className="bg-red-600 font-semibold hover:bg-red-700 text-white text-lg py-1 px-4 rounded-md transition">
                Logout
              </button>
            </div>
          )}
          <hr className="mb-4 border-t-teal-600" />
          <ul className="flex flex-col gap-3">
            {isAuthenticated && (
              <li>
                <div
                  onClick={()=>handleNavigate("/me")}
                  className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
                >
                  <FaUserCircle /> Profile
                </div>
              </li>
            )}
            <li>
              <div
                onClick={()=>handleNavigate("/how-it-works-info")}
                className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
              >
                <SiGooglesearchconsole /> How it works
              </div>
            </li>
            <li>
              <div
                onClick={()=>handleNavigate("/about")}
                className="flex text-lg font-medium gap-2 items-center text-slate-700 hover:text-teal-600 transition cursor-pointer"
              >
                <BsFillInfoSquareFill /> About Us
              </div>
            </li>
          </ul>
          <IoMdCloseCircleOutline
            onClick={() => setShow(!show)}
            className="absolute top-0 right-4 text-[28px] text-slate-600 sm:hidden hover:text-red-600 transition"
          />
        </div>

        <div>
          <div className="flex gap-2 items-center mb-2">
            <Link
              to="/"
              className="bg-white text-slate-600 p-2 text-xl rounded-md shadow hover:text-blue-700 transition"
            >
              <FaFacebook />
            </Link>
            <Link
              to="/"
              className="bg-white text-slate-600 p-2 text-xl rounded-md shadow hover:text-pink-500 transition"
            >
              <RiInstagramFill />
            </Link>
          </div>
          <div
            onClick={()=>handleNavigate("/contact")}
            className="text-slate-600 font-semibold hover:text-teal-600 transition cursor-pointer"
          >
            Contact Us
          </div>
          <p className="text-slate-600">&copy; SuhBidz, LLC.</p>
          <p className="text-slate-600">
            Designed By{" "}
            <Link target="_blank"
              to={"https://www.linkedin.com/in/banshikha-kumari-970a6b303"}
              className="font-semibold hover:text-teal-600 transition"
              >
              Banshikha
            </Link>
              <span> & </span>
            <Link target="_blank"
              to={"https://www.linkedin.com/in/gaurav-singh-iitg"}
              className="font-semibold hover:text-teal-600 transition"
            >
              Gaurav
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SideDrawer;
