import React from 'react'
import './signup.css'
import Link from 'next/link'

const SignUp = () => {
  return (
    <div>
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="user-box">
            <input type="text" name ="username" required />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>
          <div className="user-box">
            <input type="text" name="mobile" required />
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
