const { default: mongoose } = require("mongoose");
const db = require("./../../db/conn");

module.exports = {
    getUsersService: async () => {
        const data = db.db.collection("UserDetails").find({}).toArray();
        console.log(data)
        return {
            success: true,
            data: await data,
            code : 200
        }
    },
    getUsersById: async (id) => {
        console.log(id);
        const data = db.db.collection("UserDetails").findOne({_id: new mongoose.Types.ObjectId(id)});
        return {
            success: true,  
            data: await data,
            code : 200
        }
    },
    saveUser: async (data) => {
        console.log(data)
        const user = db.db.collection("UserDetails").insertOne(data);
        return {
            success: true,  
            data: "User created successfully !!!",
            code : 200
        } 
    },
    deleteUsersById: async (id) => {
        console.log(id);
        const data = db.db.collection("UserDetails").deleteOne({_id: new mongoose.Types.ObjectId(id)});
        return {
            success: true,  
            data: "User deleted successfully !!!",
            code : 200
        }
    },
    updateUsersById: async (update_data) => {
        console.log(update_data);
        const data = db.db.collection("UserDetails").updateOne({"_id": new mongoose.Types.ObjectId(update_data._id)},{$set:{"name" : update_data.name}});
        return {
            success: true,  
            data: "User updated successfully !!!",
            code : 200
        }
    }
}