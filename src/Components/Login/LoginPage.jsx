import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post(
        "http://localhost:7292/api/Accounts/login",
        { username, password }
      );
      console.log("Response data:", response.data);

      localStorage.setItem("username", response.data.Username);
      localStorage.setItem("role", response.data.Role);

      const token = response.data.token;
      localStorage.setItem("authToken", token);
      console.log("Login successful!");

      if (response.data.Role === "Admin") {
        navigate("/AdminPage");
      } else if (response.data.Role === "SaleStaff") {
        navigate("/SaleStaffPage");
      } else if (response.data.Role === "Shipper") {
        navigate("/DeliStaffPage");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Login failed:", error);
      if (error.response) {
        console.error("Error response data:", error.response.data);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("authToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return (
    <div
      style={{
        backgroundImage: `url(${"https://wallpapers.com/images/featured/space-sjryfre8k8f6i3ge.jpg"})`,
      }}
      className="relative w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      <div className="absolute w-[30vw] h-[60vh] bg-black bg-opacity-50 shadow-purple-700/50 shadow-xl rounded-lg">
        <div className="w-full flex items-center justify-center">
          <div className="w-full mt-5 flex justify-center items-center logo">
            <div className="text-[2.5em]">EterniTy</div>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="absolute top-[30%] w-full h-[55%]">
            <div className="w-full flex flex-col items-center justify-center">
              <label className="block mb-8 w-[90%] rounded-lg">
                <span className="block text-sm mb-2 text-white drop-shadow-md">
                  Username
                </span>
                <input
                  type="text"
                  required
                  placeholder="Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="outline-none border-b-[0.1em] shadow-purple-500/50 shadow-xl border-b-black bg-zinc-300 bg-opacity-0 w-full text-white"
                />
              </label>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label className="block mb-8 w-[90%] rounded-lg">
                <span className="block text-sm mb-2 text-white drop-shadow-md">
                  Password
                </span>
                <input
                  type="password"
                  required
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none border-b-[0.1em] shadow-purple-500/50 shadow-lg border-b-black bg-zinc-300 bg-opacity-0 w-full text-white"
                />
              </label>
              <button
                type="submit"
                className="px-10 py-3 border-purple-600 border-[0.1em] mt-8 text-white uppercase font-bold
             hover:shadow-purple-500/50 hover:shadow-xl hover:text-purple-500 transition-all duration-300 rounded-lg cursor-pointer"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
