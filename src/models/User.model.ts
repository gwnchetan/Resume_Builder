import mongoose from "mongoose";
import { Iuser } from "@/types/user.types";
import bcrypt from "bcrypt"

interface UserDocument extends Omit<Iuser, '_id'>, Document{
    comparePass(candidatePassword: string): boolean
}


const userSchema = new mongoose.Schema<UserDocument>( {
    name:{
        type: String,
        trim: true,
        required: [true, "name is required"]

    },
    email:{
        type: String,
        trim: true,
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required:[true, "password is required"],
        minlength: [6, "minimum characters 6"]
    },

    mobile: {
        type: String,
        minlength: [10, "min 10 characters require"],
        maxLength: [10, "max 10 characters"]
        
    },
    
    
},{timestamps: true})


userSchema.pre('save', function(): void{
    if(!this.isModified('password')) return
    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePass = function(candidatePassword: string):boolean {
    return bcrypt.compareSync(candidatePassword, this.password)
}


const UserModel = mongoose.model('User', userSchema)
export default UserModel
