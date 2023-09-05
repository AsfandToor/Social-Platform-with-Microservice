"use client"

import React, { useState } from "react";
import { AiFillCamera } from "react-icons/ai";
import Image from "next/image";
import placeholderImage from "../../assets/user-placeholder.png";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(placeholderImage); // Initialize with the placeholder image
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    if (!username || !password || !email || !password) {
      setError("All fields are required*");
      return;
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setImage(imageUrl);
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black text-white">
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg w-96 my-4">
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">Register</h2>
        <div className="relative w-fit m-auto">
          <label htmlFor="imageInput" className="cursor-pointer">
            <Image
              src={image}
              alt="Your Image Alt Text"
              width={56}
              height={56}
              className="w-16 h-16 rounded-[36px]"
            />
            <AiFillCamera className="absolute text-xl text-white right-1 bottom-0 p-0.5 bg-blue-500 rounded-[36px] cursor-pointer" />
          </label>
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Name</label>
          <input
            type="text"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Username</label>
          <input
            type="text"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Email</label>
          <input
            type="email"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 font-semibold">Password</label>
          <input
            type="password"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleRegister}
        >
          Register
        </button>
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span className="text-sm underline cursor-pointer">Login</span>
        </p>
        {error && (
          <div className="mt-2 p-2 bg-red-100 border border-red-600 rounded w-fit">
            <p className="text-red-600 text-xs italic">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
