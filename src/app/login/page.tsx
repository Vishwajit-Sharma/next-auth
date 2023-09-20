import React from 'react'
import './login.css'
import Link from 'next/link'

const Login = () => {
  return (
    <div>
      <div className="login-box">
        <h2>Login</h2>
        <form>
          <div className="user-box">
            <input type="text" name ="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
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
        </form>
      </div>
    </div>
  )
}

export default Login
