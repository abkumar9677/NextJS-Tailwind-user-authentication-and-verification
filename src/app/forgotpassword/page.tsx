"use client";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("Passwords do not match");
      } else if (newPassword.length == 0 && confirmPassword.length == 0) {
        toast.error("Fields cannot be empty");
      } else {
        await axios.post("/api/users/forgotpassword", { token, newPassword });
        toast.success("Password updated");
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Forgot Password</h1>
      <hr />
      <label htmlFor="newPassword">New Password</label>
      <input
        className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
        type="text"
        id="email"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        placeholder="New Password"
      />
      <label htmlFor="confirmPassword">Confirm Password</label>
      <input
        className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
        type="text"
        id="email"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="Confirm Password"
      />

      <button
        className="p-2 mt-4 bg-blue-500 hover:bg-blue-700 rounded text-white font-bold"
        onClick={updatePassword}
      >
        Update Password
      </button>
    </div>
  );
}
