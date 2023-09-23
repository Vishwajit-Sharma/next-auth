import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/models"
import { sendMail } from "@/helpers/mailer";

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {userName, token} = reqBody

        if(userName){
            const user = await User.findOne({userName})
            if(!user){
                return NextResponse.json({
                    message: "User Not Found",
                    success: true,
                    status: 201
                })
            }
    
            //Send reset mail
            await sendMail({email: user.email, emailtype: "FORGOT", userId: user._id})
    
            return NextResponse.json({
                message: "Mail Sent to Reset Password",
                success: true,
                status: 200
            })
        }

        else if(token){

            const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})

            if(!user){
                return NextResponse.json({error: "Invalid Token"}, {status:400} )
            }
    
            return NextResponse.json({
                message: "Password Reset Link Sent Successfully",
                success: true
            })
        }  

    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}