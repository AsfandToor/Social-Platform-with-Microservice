"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Loader from "@/app/components/Ui/loader";
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("")
    if (!form.email || !form.password) {
      setError("All fields are required*");
      return;
    }
    setLoading(true);
    const data = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    if (data?.error) {
      if (data?.error == "CredentialsSignin")
        setError("Invalid email or password");
      else setError("Something went wrong, please try again later");
      setLoading(false);
    } else {
      router.push("/home");
    }
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-black text-white">
      <div className="relative bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        {error && (
          <div className="my-2 p-2 bg-red-100 border border-red-600 rounded w-full">
            <p className="text-red-600 text-sm"><span className="font-bold mr-2">Error: </span>{error}</p>
          </div>
        )}
        <h2 className="text-3xl font-semibold text-gray-200 mb-4">Login</h2>
        <div className="mb-4">
          <label className="block text-gray-400 font-semibold">Email</label>
          <input
            type="text"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-400 font-semibold">Password</label>
          <input
            type="password"
            className="border text-gray-600 border-gray-600 rounded-lg px-3 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
        </div>
        <button
          className="bg-blue-500 text-white rounded-lg py-2 px-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          onClick={handleLogin}
        >
          Login
        </button>
        <p className="mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <span className="text-sm underline cursor-pointer">Register</span>
        </p>

        <Loader className="top-0 left-0 rounded-lg" loading={loading} />
      </div>
    </div>
  );
}
