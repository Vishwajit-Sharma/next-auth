"use client";

import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const SignUp = () => {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
    mobile: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
     const response = await axios.post("api/users/signup", user);
     
     if(response.data.status == 201){
      toast.error(response.data.message);
      setUser({...user, userName: ""})
     }
     else if(response.data.status == 200){
      toast.success(response.data.message);
      router.push("/");
     }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div>
      <div className="login-box">
        <h2>{isLoading ? "Signing Up" : "Sign Up"}</h2>
        {isLoading ? (
          <div className="w-100 d-flex justify-content-center my-4">
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="#03e9f4"
              ariaLabel="ball-triangle-loading"
              // wrapperClass={{}}
              // wrapperStyle=""
              visible={true}
            />
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="user-box">
              <input
                type="text"
                name="username"
                required
                autoComplete="off" 
                value={user.userName}
                onChange={(e) => setUser({ ...user, userName: e.target.value })}
              />
              <label>Username</label>
            </div>
            <div className="user-box">
              <input
                type="password"
                name="password"
                required
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
              <label>Password</label>
            </div>
            <div className="user-box">
              <input
                type="email"
                name="email"
                required
                autoComplete="off" 
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <label>Email</label>
            </div>
            <div className="user-box">
              <input
                type="text"
                name="mobile"
                required
                autoComplete="off" 
                value={user.mobile}
                onChange={(e) => setUser({ ...user, mobile: e.target.value })}
              />
              <label>Mobile No</label>
            </div>
            <div className="d-flex justify-content-center">
              <button className="myButton my-3" type="submit">
                <span />
                <span />
                <span />
                <span />
                Submit
              </button>
            </div>
            <p className="text-white mt-3">
              Already Registered ? <Link href="/login"> Login Here</Link>
            </p>
          </form>
        )}
      </div>
      <Toaster position="top-center" />
    </div>
  );
};

export default SignUp;
