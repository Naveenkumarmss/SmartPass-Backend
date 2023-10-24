import userSchema from "../model/userSchema.js";
import authSchema from "../model/authSchema.js";
import AadharSchema from "../model/AadharSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const authSignup = async (req, res) => {
    const bodyaadharid = req.body.aadharid;
    try {
      const checkid = await AadharSchema.findOne({ aadharid: bodyaadharid });
      if (checkid) {
        const checkUser = await userSchema.findOne({
          aadharid: bodyaadharid,
        });
        if (checkUser) {
          res
            .status(400)
            .json({ success: false, message: "Aadhar ID already exists" });
        } else {
  await userSchema.create({name: req.body.name, aadharid: req.body.aadharid, address: req.body.address,age: req.body.age});
  await authSchema.create({aadharid: req.body.aadharid, password: req.body.password});
  res.status(200).json({ success: true, message: "User Created" });
}
      } else {
        res.status(400).json({ success: false, message: "Aadhar ID not found" });
      }
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
};
const authlogin = async (req, res, next) => {
  try {
    if (!req.body.aadharid && !req.body.password)
      throw new badRequest("Email and Password is required");
    const User = await authSchema.findOne({ aadharid: req.body.aadharid });
    if (!User) throw new badRequest("User not found");
    const isMatch = await comparePassword(req.body.password, User.password);
    if (!isMatch) throw new badRequest("Password is not correct");
    const token = jwtGenrator({ payload: { id: User._id, aadharid: User.aadharid } });
    res.cookie(
      "token",
      token,
      { httpOnly: true },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.status(StatusCodes.OK).json({ message: "User Found", token: token });
  } catch (error) {
    next(error);
  }
};

export { authSignup, authlogin };