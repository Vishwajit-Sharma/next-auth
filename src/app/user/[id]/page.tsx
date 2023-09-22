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
    <div>
      <h1 className='text-white'>{params.id}</h1>
      <div>
        <h1 className='text-warning'>{user?.userName}</h1>
        <h3 className='text-warning'>{user?.email}</h3>
        <h5 className='text-warning'>{user?.mobile}</h5>
      </div>
      <button className="btn btn-light mt-5" onClick={()=> router.push("/")}>Back to Home</button>
    </div>
  )
}

export default userPage
