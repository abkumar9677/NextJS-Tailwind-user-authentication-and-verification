"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [buttondisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const onLogin = async () => {
    try {
      const response = await axios.post("/api/users/login", user);
      console.log(response, "this is the login res");
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Error in signup: ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl">SignUp</h1>
        <hr />
        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />

        <label htmlFor="password">password</label>
        <input
          className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          onClick={onLogin}
          className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700"
        >
          {buttondisabled ? "Disbaled" : "Login here"}
        </button>
        <Link href="/signup">Visit Signup Page</Link>
        <Link href="/validate-email">Forgot Password</Link>
      </div>
    </>
  );
}
