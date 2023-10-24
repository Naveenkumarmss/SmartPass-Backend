import Express from "express";
import {authSignup,authlogin} from "../controller/authController.js";

const authrouter = Express.Router();

authrouter.route("/signup").post(authSignup);
authrouter.route("/login").post(authlogin);


export default authrouter;