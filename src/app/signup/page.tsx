"use client"

import React, { useState } from 'react'
import './signup.css'
import Link from 'next/link'

const SignUp = () => {
  const [user, setUser] = useState({userName: "", password: "", email: "", mobile: ""})
  return (
    <div>
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="user-box">
            <input type="text" name ="username" required value={user.userName} onChange={(e)=>setUser({...user, userName: e.target.value})}/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required value={user.password} onChange={(e)=>setUser({...user, password: e.target.value})}/>
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="email" name="email" required value={user.email} onChange={(e)=>setUser({...user, email: e.target.value})}/>
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="text" name="mobile" required value={user.mobile} onChange={(e)=>setUser({...user, mobile: e.target.value})}/>
            <label>Mobile No</label>
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
          <p className='text-white mt-3'>Already Registered ? <Link href="/login"> Login Here</Link></p>
        </form>
      </div>
    </div>
  )
}

export default SignUp
