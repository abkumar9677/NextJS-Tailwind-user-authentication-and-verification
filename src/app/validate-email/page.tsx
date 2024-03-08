"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ValidateEmail() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const onValidateEmail = async () => {
    if (email && email.length > 0) {
      try {
        await axios.post("/api/users/validate-email", { email });
        toast.success("Mail sent to your inbox to reset your password");
      } catch (error: any) {
        toast.error(error.response.data);
      }
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl">Validate Email</h1>
      <hr />
      <label htmlFor="email">Email Address</label>
      <input
        className="p-2 mt-4 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
        type="text"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
      />
      <button
        onClick={onValidateEmail}
        className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700"
      >
        Validate
      </button>
    </div>
  );
}
