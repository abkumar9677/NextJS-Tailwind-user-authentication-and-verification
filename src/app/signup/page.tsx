"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function SignUpPage() {
  const [user, setUser] = useState({ email: "", username: "", password: "" });
  const [buttondisabled, setButtonDisabled] = useState(false);
  const router = useRouter();
  const onSignup = async () => {
    try {
      console.log(user,"signupuserdetails")
      const response = await axios.post("/api/users/signup", user);
      console.log(response, "this is the sign up res");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in signup: ", error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
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
        <label htmlFor="username">username</label>
        <input
          className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />

        <label htmlFor="email">email</label>
        <input
          className="p-2 border border-gray-500 rounded-lg mb-4 focus:outline-none focus:border-gray-700 "
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
          onClick={onSignup}
          className="p-2 border border-gray-500 text-black rounded-lg mb-4 focus:outline-none focus:border-gray-700"
        >
          {buttondisabled ? "Disabled" : "Signup here"}
        </button>
        <Link href="/login">Visit Login Page</Link>
      </div>
    </>
  );
}
