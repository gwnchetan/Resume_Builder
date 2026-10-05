import { genrateToken } from "@/lib/jwt"
import connectDB from "@/lib/mongoDB"
import UserModel from "@/models/User.model"
import { ApiResponse } from "@/types/api.types"
import { RegisterBody } from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"


export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body:RegisterBody = await req.json()

        const {name, email, mobile ,password} = body

        if(!name || !email || !password){
            return NextResponse.json <ApiResponse>({
                success: false,
                message: "all fileds are required"
            },{
                status: 400
            })
        }

        const isExisted = await UserModel.findOne({email})
        if(isExisted)return NextResponse.json<ApiResponse>({
            success: false, message:"user already exists"
        },{
            status: 409   
        })

        const newUser = await UserModel.create({
            name ,email ,password, mobile
        })
        
        const token = genrateToken({userId: newUser._id.toString()})

        const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "user register successfully",
            data: {
                user: {
                    _id: newUser._id,
                    name:newUser.name,
                    email: newUser.email
                }
            }
        },{ status: 201})

        response.cookies.set('token', token,{
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        return response

    } catch (error) {
        console.log("error in register API",error)
        return NextResponse.json <ApiResponse>({
            success: false,
            message: "something went wrong", 
            error:{ error }
        },{status: 500})
    
    }
}