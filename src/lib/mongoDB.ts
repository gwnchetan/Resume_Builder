import mongoose from 'mongoose'

const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        console.log("mongooDB connected")

    }catch(error){
        console.log("error while connecting DB", error)
    }
}

export default connectDB