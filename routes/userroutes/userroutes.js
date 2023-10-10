// const controller = require("./../../controller/usercontroller/usercontroller");
import Express  from "express";
import { getAllUser,getUserById, CreateNewUser, deleteUser,updateUser, testing } from "../../controller/usercontroller/usercontroller.js";
const router = Express.Router()

// crud operation for user details
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.delete("/:id",deleteUser);
router.post("/new", CreateNewUser);
router.patch("/:id",updateUser);
router.post("/generateid",testing)
// router.delete("/:id", controller.deleteUser);
// router.put("/", controller.updateUser);

export default router;