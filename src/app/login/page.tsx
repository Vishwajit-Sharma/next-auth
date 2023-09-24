"use client"

import React,{useState} from 'react'
import Link from 'next/link'
import axios from "axios";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const [user, setUser] = useState({userName: "", password: ""})
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);

      if(response.data.status == 201){
        toast.error(response.data.message);
        setUser({userName: "", password: ""})
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

 async function forgotPassword(){
  if(user.userName == ""){
    return toast.error("Enter your username")
  }
    toast.success("Pls wait")
    const response = await axios.post("/api/users/forgotpassword", user)

    if(response.data.status == 201){
      toast.error(response.data.message);
      setUser({userName: "", password: ""})
    }
    else if(response.data.status == 200){
      toast.success(response.data.message)
      setUser({userName: "", password: ""})
    }
   
  }

  return (
    <div>
      <div className="login-box">
      <h2>{isLoading ? "Logging In" : "Login"}</h2>
        {isLoading ?  <div className="w-100 d-flex justify-content-center my-4">
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="#03e9f4"
              ariaLabel="ball-triangle-loading"
             
              visible={true}
            />
          </div> : <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input type="text" name ="username" autoComplete="off" required value={user.userName} onChange={(e)=>setUser({...user, userName: e.target.value})}/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <label>Password</label>
          </div>
          <div className='d-flex justify-content-center'>
          <button className='myButton my-3' type='submit' >
            <span />
            <span />
            <span />
            <span />
            Submit
          </button>
          </div>
         
        </form>}
        <p className='text-white mt-3'>Forgot Password ? <button className='forgot' onClick={forgotPassword}> Click Here</button></p>
          <p className='text-white mt-3'>Not Registered ? <Link href="/signup"> Register Here</Link></p>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

export default Login
