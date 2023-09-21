"use client"

import React,{useState} from 'react'
import './login.css'
import Link from 'next/link'
import axios from "axios";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";

const Login = () => {
  const [user, setUser] = useState({userName: "", password: ""})
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  return (
    <div>
      <div className="login-box">
      <h2>{isLoading ? "Loggining In" : "Login"}</h2>
        {isLoading ?  <div className="w-100 d-flex justify-content-center my-4">
            <BallTriangle
              height={200}
              width={200}
              radius={5}
              color="#03e9f4"
              ariaLabel="ball-triangle-loading"
              wrapperClass={{}}
              wrapperStyle=""
              visible={true}
            />
          </div> : <form>
          <div className="user-box">
            <input type="text" name ="username" required value={user.userName} onChange={(e)=>setUser({...user, userName: e.target.value})}/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <label>Password</label>
          </div>
          <div className='d-flex justify-content-center'>
          <Link className='myButton my-3' href="#">
            <span />
            <span />
            <span />
            <span />
            Submit
          </Link>
          </div>
          <p className='text-white mt-3'>Not Registered ? <Link href="/signup"> Register Here</Link></p>
        </form>}
      </div>
    </div>
  )
}

export default Login
