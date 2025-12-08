//Model
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    userEmail: {
      type: String,
      required: [true, "userEmail must be provided"],
    },
    userPassword: {
      type: String,
      required: [true, "Password must be provided"],
    },
    userPhoneNumber: {
      type: number,
      required: [true, "PhoneNumber must be provided"],
    },
    role: {
      type: string,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
