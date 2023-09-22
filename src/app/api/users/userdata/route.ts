import getDataFromToken from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/models";
import {connect} from "@/dbConfig/dbConfig"

connect()

export async function GET(request: NextRequest){
    try {
        const user:any = getDataFromToken(request)
        if(user && user.id){
            const userData = await User.findOne({_id:user.id}).select("-password")
            if(!userData){
                return NextResponse.json({
                    message: "User not found",
                    data: userData,
                    status: 201
                })
            }
            return NextResponse.json({
                message: "User found",
                data: userData,
                status: 200
            })
        }
        else{
            return NextResponse.json({
                message: "User not found",
                status: 201
            })
        }
        
        
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 400})
    }
}
