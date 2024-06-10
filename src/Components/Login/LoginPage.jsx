import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("API_ENDPOINT_URL", {
        email,
        password,
      });

      // Giả sử token được trả về trong response.data.token
      const token = response.data.token;

      // Lưu token vào localStorage
      localStorage.setItem("authToken", token);

      // Chuyển hướng đến trang chính hoặc làm gì đó sau khi đăng nhập thành công
      console.log("Login successful!");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password);
  };

  // Thiết lập interceptor cho axios để thêm token vào header
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

  // const handleLogout = () => {
  //   localStorage.removeItem('authToken');
  //   console.log('Logout successful!');
  // };

  // <button onClick={handleLogout}>Logout</button>
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: `url(${"https://wallpaperaccess.com/full/1978236.jpg"})`,
      }}
      className="relative w-screen h-screen flex flex-col items-center justify-center bg-cover bg-center bg-no-repeat"
    >
      {/* Logo */}
      <div className="absolute w-[30vw] h-[60vh] bg-black bg-opacity-50 shadow-red-500/50 shadow-xl rounded-lg">
        <div className="w-full flex items-center justify-center">
          <img
            src="https://logos-world.net/wp-content/uploads/2020/06/Cartier-Logo.png"
            alt=""
            className="w-[40%]"
          />
        </div>
        {/* Login form */}
        <form onSubmit={handleSubmit}>
          <div className="absolute top-[30%] w-full h-[55%]">
            <div className="w-full flex flex-col items-center justify-center">
              <label className="block mb-8 w-[90%] rounded-lg">
                <span className="block text-sm mb-2 text-red-700 opacity-60">
                  Email address
                </span>
                <input
                  type="email"
                  required
                  placeholder="Your@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="outline-none border-b-[0.1em] shadow-red-500/50 shadow-xl border-b-black bg-zinc-300 bg-opacity-0 w-full text-white"
                />
              </label>
            </div>
            <div className="w-full flex flex-col items-center justify-center">
              <label className="block mb-8 w-[90%] rounded-lg">
                <span className="block text-sm mb-2 text-red-700 opacity-60">
                  Password
                </span>
                <input
                  type="password"
                  required
                  placeholder="*********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="outline-none border-b-[0.1em] shadow-red-500/50 shadow-lg border-b-black bg-zinc-300 bg-opacity-0 w-full text-white"
                />
              </label>
              {/* Submit */}
              <button
                onClick={() => navigate("/AdminPage")}
                type="submit"
                className="px-10 py-3 border-red-600 border-[0.1em] mt-8 text-white uppercase font-bold
             hover:shadow-red-500/50 hover:shadow-xl hover:text-red-500 transition-all duration-300 rounded-lg cursor-pointer"
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
