import Express from "express";
import {authSignup,authlogin} from "../controller/authController.js";
import fileUpload from "../Middleware/fileUpload.js";
const authrouter = Express.Router();

authrouter.route("/signup").post(fileUpload.single("image"),authSignup);
authrouter.route("/login").post(authlogin);


export default authrouter;