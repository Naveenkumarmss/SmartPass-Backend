const { getUsersService, getUsersById, saveUser, deleteUsersById, updateUsersById } = require("./../../service/userservice/userservice");

module.exports = {
    getUsers: async (req, res) => {
        try {
            console.log("inside user controller!!")
            const users = await getUsersService();    
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error !!!!")
        }
    },
    getUsersById: async (req, res) => {
        try {
            console.log("inside user getUsersById controller!!")
            const users = await getUsersById(req.params.id);    
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error !!!!")
        }
    },
    saveUser: async (req, res) => {
        try {
            console.log("inside user getUsersById controller!!")
            const users = await saveUser(req.body);    
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error !!!!")
        }
    },
    deleteUser:  async (req, res) => {
        try {
            console.log("inside user getUsersById controller!!")
            const users = await deleteUsersById(req.query.id);    
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error !!!!")
        }
    },
    updateUser:  async (req, res) => {
        try {
            console.log("inside user getUsersById controller!!")
            const users = await updateUsersById(req.body);    
            res.send(users);
        } catch (error) {
            console.log(error)
            res.status(500).send("Internal Server Error !!!!")
        }
    },
}