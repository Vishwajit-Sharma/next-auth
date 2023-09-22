import {connect} from '../../../../dbConfig/dbConfig'
import User from '../../../../models/models'
import {NextRequest, NextResponse} from "next/server"
import bcryptjs from "bcryptjs"

connect()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {userName, password, email, mobile} = reqBody

        const user = await User.findOne({userName})
        if(user){
            return NextResponse.json({
                message: "User already exist",
                success: true,
                status: 201
            })
            //return NextResponse.json({message: "User already exist"}, {status: 400})
        }

        //password encryption
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            userName, 
            email,
            password: hashedPassword,
            mobile
        })

        const savedUser = await newUser.save()

        return NextResponse.json({
            message: "User created successfully",
            success: true,
            savedUser,
            status: 200
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status:500})
    }
}