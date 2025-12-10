const express = require("express");
const connectDB = require("./database/connectDB");
const User = require("./model/userModel");
const app = express();

const bcrypt = require("bcrypt");

require("dotenv").config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/", async (req, res) => {
  const { email, password, phoneNumber, username } = req.body;
  if (!email || !password || !phoneNumber || !username) {
    return res.status(400).json({
      message: "Please provide email,password,phoneNumber",
    });
  } //else
  const userFound = await User.find({ userEmail: email });
  if (userFound.length > 0) {
    return res.status(400).json({
      message: "USer with that email already registered",
    });
  }

  await User.create({
    userName: username,
    userPhoneNumber: phoneNumber,
    userEmail: email,
    userPassword: bcrypt.hashSync(password, 10),
  });

  res.status(201).json({
    message: "User Registered successfully !!",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      message: "Please provide email,password",
    });
  }
  const userFound = await User.find({ userEmail: email });
  if (userFound.length == 0) {
    return res.status(400).json({
      message: "USer with that email is not registered",
    });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server has started at PORT ${port}`);
});
