import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema(
  {
    aadharid: {
      type: Number,
      required: true,
      minlength: 12,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  { timestamps: true }
);

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const authSchema = mongoose.model("authUser", User);

export default authSchema;