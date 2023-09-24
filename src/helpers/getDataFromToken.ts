import React from 'react'
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")
    if(token){
      const decodedToken = jwt.verify(token.value, process.env.TOKEN_SECRET!)
      return decodedToken
    }
    else{
      return false
    }
    
  } catch (error: any) {
        throw new Error(error.message)
  }
}

export default getDataFromToken
