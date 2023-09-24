"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from "axios";

const userPage = ({params}: any) => {
    const [user, setUser] = useState<any>({})
    const router = useRouter()

    useEffect(()=>{
        async function fetchUser(){
            const response = await axios.get("/api/users/userdata")
            setUser(response.data.data)
        }
        fetchUser()
    },[])

  return (
    <div className='d-flex flex-column mt-5 pt-5'>
      <h5 className='text-white text-center'>ID : <span className='text-warning'>{params.id}</span></h5>
      <div>
        <h1 className='text-center text-white mt-4'>UserName : <span className='text-warning'>{user?.userName}</span></h1>
        <h3 className='text-center text-white mt-3'>Email : <span className='text-warning'>{user?.email}</span></h3>
        <h4 className='text-center text-white mt-3'>Mobile No : <span className='text-warning'>{user?.mobile}</span></h4>
      </div>
      <div className='d-flex justify-content-center'>
      <button className="btn btn-light mt-5" onClick={()=> router.push("/")}>Back to Home</button>
      </div>
      
    </div>
  )
}

export default userPage
