import UserSchema from "../../model/userSchema.js"
import AadharSchema from "../../model/AadharSchema.js";

const getAllUser = async (req, res) => {
    const getUser = await UserSchema.find({});
    res.status(200).json(getUser);
  };

  const getUserById = async(req,res)=>{
    const Id = req.params.id
    const getId = await UserSchema.find({Id})
    console.log(getId)
  }
  
  const CreateNewUser = async (req, res) => {
    try {
      // Check if the Aadhar ID already exists in AadharSchema
      const checkid = await AadharSchema.findOne({ aadarrid: req.body.aadharid });
  
      if (checkid) {
        // Aadhar ID not found, proceed to create a new user
        const addUser = await UserSchema.create(req.body);
        res.status(200).json({ success: true, message: "User Created" });
      } else {
        // Aadhar ID already exists, send a response indicating that
        res.status(400).json({ success: false, message: "Aadhar ID already exists" });
      }
    } catch (err) {
      // Handle any errors that occur during the process
      res.status(500).json({ success: false, message: err.message });
    }
  };
  

  const deleteUser = async(req,res)=>{
    try{

        const data = await UserSchema.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "User Deleted" });
    }
    catch(err){
        res.send(err.message)
    }
    }
    
    const updateUser = async(req,res)=>{
        try{
            const data = await UserSchema.findByIdAndUpdate(req.params.id,req.body,{
                new:true,
            })
            if (!data) throw new badRequest("Note not updated");
            res.status(200).json({ success: true, message: "User Updated" });
        }
        catch(err){
            res.send(err.message)
        }
    }


    const testing = async(req,res)=>{
        const testcreate = await AadharSchema.create(req.body)
    }
  export { getAllUser, CreateNewUser,deleteUser, updateUser ,getUserById,testing};