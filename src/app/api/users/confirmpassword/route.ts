import {connect} from '../../../../dbConfig/dbConfig'
import User from '../../../../models/models'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {password, token} = reqBody

        //password encryption
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        // if(!user){
        //     return NextResponse.json({error: "Invalid Token"}, {status:400} )
        // }

        const updatedUser = await User.findOneAndUpdate({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}},
                     {password: hashedPassword}, { new: true });

        const savedUser = await updatedUser.save()

        return NextResponse.json({
            message: "Password Reset successfully",
            success: true,
            status: 200
        })

    } catch (error: any) {
        console.log("Error -", error)
        return NextResponse.json({error: error.message}, {status:500})
    }
}