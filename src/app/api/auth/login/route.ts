import { genrateToken } from "@/lib/jwt"
import connectDB from "@/lib/mongoDB"
import UserModel from "@/models/User.model"
import { ApiResponse } from "@/types/api.types"
import { LoginBody} from "@/types/user.types"
import { NextRequest, NextResponse } from "next/server"



export async function POST(req: NextRequest) {
    try {
        await connectDB()
        const body:LoginBody = await req.json()

        const {email, password} = body

        if(!email || !password){
            return NextResponse.json <ApiResponse>({
                success: false,
                message: "all fileds are required"
            },{
                status: 400
            })
        }

        const isExisted = await UserModel.findOne({email})
        if(!isExisted)return NextResponse.json<ApiResponse>({
            success: false, 
            message:"user not found please register"
        },{
            status: 404  
        })

        const matchPass = isExisted.comparePass(password)

        if(!matchPass)return NextResponse.json<ApiResponse>({
            success: false, 
            message:"invalid credentials"
        },{
            status: 401
        })

       const token = genrateToken({userId: isExisted._id.toString()})

     const response = NextResponse.json<ApiResponse>({
            success: true,
            message: "user login successfully",
            data: {
                user: {
                    _id: isExisted._id,
                    name:isExisted.name,
                    email: isExisted.email
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