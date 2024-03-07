"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfilePage() {
  const [data, setData] = useState();
  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log("Error in logout:: ", error);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    const resp = await axios.get("/api/users/user");
    console.log(resp.data, "resp data");
    setData(resp.data.data._id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <hr />
      <p className="text-xl text-gray-700 dark:text-white font-semibold">
        ProfilePage
      </p>
      <h2>
        {data === "" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>User Profile - {data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get user details
      </button>
    </div>
  );
}
