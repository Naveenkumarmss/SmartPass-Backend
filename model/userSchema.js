import mongoose from "mongoose"

const smartpass = new mongoose.Schema(
    {
    name: {
        type:String,
        required:true
    },
    aadharid: {
        type:Number,
        required:true
        },
    address: {
        type:String,
        required:true
    },
    age: {
        type:Number,
        required:true
    },
    },
)

const userSchema = mongoose.model("userDetails", smartpass);

export default userSchema;