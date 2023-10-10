import mongoose from "mongoose"


const aadharDetails = new mongoose.Schema(
    {
    
    aadharid: {
        type:Number,
        required:true
    },
    },
)

const AadharSchema = mongoose.model("aadharDetails", aadharDetails);

export default AadharSchema;