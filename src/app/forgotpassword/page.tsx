"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const ForgotPassword = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);
  const [password, setPassword] = useState({ pass: "", cpass: "" });

  const router = useRouter()

  useEffect(()=>{
    const urlToken = window.location.search.split("=")[1]

    if(urlToken && urlToken.length > 0){
        verifyToken(urlToken)
    }
  }, [])

  const verifyToken = async(url:string) => {
    try {
        await axios.post('/api/users/forgotpassword', {token: url})
        setIsVerified(true)
        setToken(url)
        
    } catch (error:any) {
        setError(true)
        toast.error(error.response.data)
    }
  }

  const handleReset = async() => {
    if(password.pass == password.cpass){
        try {
            await axios.post('/api/users/confirmpassword', {password: password.pass, token: token})
            setError(false)
            toast.success("password Reset Successfully")
            router.push("/login")

        } catch (error:any) {
            setError(true)
            toast.error(error.response.data)
        }
    }
  }

  return (
    <div className="d-flex w-100 flex-column mt-5 pt-5">
      <h1 className="mt-5  text-white text-center">
        {" "}
        {error ? "Error" : "Reset Your Password"}
      </h1>
      <p className="text-white text-center mt-3">
        Here is your Token -{" "}
        <span className="text-warning "> {token ? token : "No Token Yet"}</span>
      </p>

      {isVerified && (
        <div className="login-box mt-5">
          <div className="user-box">
            <input
              type="text"
              name="pass"
              autoComplete="off"
              required
              value={password.pass}
              onChange={(e) =>
                setPassword({ ...password, pass: e.target.value })
              }
            />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input
              type="password"
              name="cpass"
              required
              value={password.cpass}
              onChange={(e) =>
                setPassword({ ...password, cpass: e.target.value })
              }
            />
            <label>Confirm Password</label>
          </div>
          <div className="d-flex justify-content-center">
            <button className="reset my-3" onClick={handleReset}
            disabled = {password.pass !== password.cpass || password.pass == "" || password.cpass == ""}>
              {password.pass !== password.cpass || password.pass == "" || password.cpass == "" ? 'Password Not Matched' : 'Reset'}
            </button>
          </div>
        </div>
      )}
      <Toaster position="top-center" />
    </div>
  );
};

export default ForgotPassword;
