"use client"
import React from 'react'

const UserProfile = ({params}: any) => {
    
  return (
    <div>
      <h1 className='text-white'>User Profile - <span className='bg-warning'>{params.id}</span></h1>
    </div>
  )
}

export default UserProfile
