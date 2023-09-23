"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const VerifyMail = () => {
  const router = useRouter();

  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  useEffect(()=>{
    const urlToken = window.location.search.split("=")[1]

    if(urlToken && urlToken.length > 0){
        verifyEmail(urlToken)
    }
  }, [])

  const verifyEmail = async(url:string) => {
    try {
        await axios.post('/api/users/verify', {token: url})
        setIsVerified(true)
        setToken(url)
        
    } catch (error:any) {
        setError(true)
        toast.error(error.response.data)
    }
  }

  return (
    <div className="d-flex w-100 flex-column mt-5 pt-5">
      <h1 className="mt-5 pt-5 text-white text-center">
        {" "}
        {error ? "Error in Verifying Email" : "Email Verified"}
      </h1>
      <p className="text-white mb-5 text-center">
        Here is your Token -{" "}
        <span className="text-warning ">
          {" "}
          {token ? token : "No Token Yet"}
        </span>
      </p>

      {isVerified && (
        <div className="w-100 d-flex justify-content-center">
            <button className="btn btn-light" onClick={() => router.push(`/login`)}>
          Click to Login
        </button>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default VerifyMail;
