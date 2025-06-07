import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-center bg-gray-50">
        <div className="bg-white mx-auto w-full max-w-md h-auto px-8 py-8 flex flex-col gap-6 items-center justify-center rounded-lg shadow-md">
          <h1 className="text-teal-600 text-3xl font-bold mb-4">
            Welcome Back
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-1">
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
            <div className="flex flex-col gap-1">
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
            <button
              className="bg-teal-600 hover:bg-teal-500 transition-colors duration-300 text-white font-medium py-3 px-6 rounded-md text-lg w-full mt-4"
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging In..." : "Login"}
            </button>
          </form>
          <div className="text-sm text-gray-600 mt-2">
            Don't have an account?{" "}
            <span 
              className="text-teal-600 hover:text-teal-800 cursor-pointer font-medium"
              onClick={() => navigateTo("/sign-up")}
            >
              Sign up
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;