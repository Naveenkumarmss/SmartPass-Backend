import UserSchema from "../model/userSchema.js"
import AadharSchema from "../model/AadharSchema.js";

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
    const bodyaadharid = req.body.aadharid;
    try {
      const checkid = await AadharSchema.findOne({ aadharid: bodyaadharid });
      if (checkid) {
        const checkUser = await UserSchema.findOne({
          aadharid: bodyaadharid,
        });
        if (checkUser) {
          res
            .status(400)
            .json({ success: false, message: "Aadhar ID already exists" });
        } else {
          const addUser = await UserSchema.create(req.body);
          res.status(200).json({ success: true, message: "User Created" });
        }
      } else {
        res.status(400).json({ success: false, message: "Aadhar ID not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
    // res.send(req.body.aadharid)
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


  export { getAllUser, CreateNewUser,deleteUser, updateUser ,getUserById};