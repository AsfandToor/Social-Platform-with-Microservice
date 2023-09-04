"use client"

import React, { useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // TODO
  };

  return (
    <div className="flex h-screen justify-center items-center bg-black text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Username</label>
          <input
            type="text"
            className="border border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e)=>{setUsername(e.target.value);}}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 font-semibold">Password</label>
          <input
            type="password"
            className="border border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value);}}
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
}
