import {connect} from '../../../../dbConfig/dbConfig'
import User from '../../../../models/models'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {userName, password} = reqBody

        //check if user exist
        const user = await User.findOne({userName})
        if(!user){
            return NextResponse.json({
                message: "User not exist",
                success: true,
                status: 201
            })
            //return NextResponse.json({error: "User not exist"}, {status: 400})
        }

        //check valid password
        const validPassword = await bcryptjs.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json({
                message: "Password doesn't match",
                success: true,
                status: 201
            })
            //return NextResponse.json({error: "Password doesn't match"}, {status: 400})
        }
        
        //Create Token
        const tokenData = {
            id: user._id,
            userName: user.userName,
            email: user.email,
            mobile: user.mobile
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" })
        const response = NextResponse.json({
            message: "Login Successful",
            success: true,
            status: 200
        })

        response.cookies.set("token", token, {httpOnly: true})

        return response

    } catch (error: any) {
        console.log("Error -", error)
        return NextResponse.json({error: error.message}, {status:500})
    }
}