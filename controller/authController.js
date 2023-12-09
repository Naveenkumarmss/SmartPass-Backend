import { randomUUID } from "crypto";
import authSchema from "../model/authSchema.js";
import { v2 as cloudinary } from "cloudinary";
import AadharSchema from "../model/AadharSchema.js";
import { badRequest } from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const authSignup = async (req, res) => {
  try {
    const { name, aadharid, address, age, fingerprint, password } = req.body;
    const { destination, filename } = req.file;
    const filePath = destination + "/" + filename;
    const { secure_url } = await cloudinary.uploader.upload(filePath, {
      public_id: randomUUID(),
      folder: "recipe",
    });
    console.log(secure_url);
    const existingAadhar = await AadharSchema.findOne({ aadharid });

    if (!existingAadhar) {
      return res
        .status(400)
        .json({ success: false, message: "Aadhar ID not found" });
    }

    const existingUser = await authSchema.findOne({ aadharid });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Aadhar ID already exists" });
    }

    await authSchema.create({
      aadharid,
      password,
      name,
      address,
      age,
      fingerprint,
      photo: secure_url,
    });
    res.status(200).json({ success: true, message: "User Created" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const authlogin = async (req, res, next) => {
  try {
    if (!req.body.aadharid && !req.body.password)
      throw new badRequest("AadharId and Password is required");
    const User = await authSchema.findOne({ aadharid: req.body.aadharid });
    if (!User) throw new badRequest("User not found");
    const isMatch = await comparePassword(req.body.password, User.password);
    if (!isMatch) throw new badRequest("Password is not correct");
    const token = jwtGenrator({ payload: { id: User._id } });
    res.cookie(
      "token",
      token,
      { httpOnly: false, secure: true },
      { maxAge: 1000 * 60 * 60 * 24 }
    );
    res.status(StatusCodes.OK).json({ message: "User Found", token: token });
  } catch (error) {
    next(error);
  }
};

export { authSignup, authlogin };
