"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verify", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token && token.length > 0) {
      verifyEmail();
    }
  }, [token]);
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl">Verify Email</h1>
        <h2 className="p-2 bg-cyan-400 text-black">
          {token ? `${token}` : "no token"}
        </h2>

        {verified && (
          <div>
            <p className="p-4 text-green-500 font-bold">
              Your email has been verified.
            </p>
            <Link href="/login" passHref>
              Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <p className="p-4 text-red-500 font-bold">
              Your email verification throws an error.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
