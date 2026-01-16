const express = require("express");
const connectDB = require("./database/connectDB");
const cors = require("cors");
const app = express();

require("dotenv").config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

//const User = require("./model/userModel");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const { registerUser, loginUser } = require("./controller/auth/authController");

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
//Routes Here
const authRoute = require("./routes/authRoute");
const productRoute = require("./routes/productRoute");
const adminUser = require("./routes/adminUsersRoute");
const userReviewRoute = require("./routes/userReviewRoute");
const profileRoute = require("./routes/profileRoute");
const cartRoute = require("./routes/cartRoute");

app.use("", authRoute);
app.use("", productRoute);
app.use("", adminUser);
app.use("", userReviewRoute);
app.use("", profileRoute);
app.use("", cartRoute);

// Health check route for Render
app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Backend is running!",
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server has started at PORT ${port}`);
});

// app.post("/register", async (req, res) => {
//   const { email, password, phoneNumber, username } = req.body;
//   if (!email || !password || !phoneNumber || !username) {
//     return res.status(400).json({
//       message: "Please provide email,password,phoneNumber",
//     });
//   } //else
//   const userFound = await User.find({ userEmail: email });
//   if (userFound.length > 0) {
//     return res.status(400).json({
//       message: "USer with that email already registered",
//     });
//   }

//   await User.create({
//     userName: username,
//     userPhoneNumber: phoneNumber,
//     userEmail: email,
//     userPassword: bcrypt.hashSync(password, 10),
//   });

//   res.status(201).json({
//     message: "User Registered successfully !!",
//   });
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     res.status(400).json({
//       message: "Please provide email,password",
//     });
//   }
//   const userFound = await User.find({ userEmail: email });
//   if (userFound.length == 0) {
//     return res.status(400).json({
//       message: "USer with that email is not registered",
//     });
//   }
//   //password check
//   const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
//   if (isMatched) {
//     //generate token
//     const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
//       expiresIn: "30d",
//     });

//     res.status(200).json({
//       message: "User logged in successfully",
//       token,
//     });
//   } else {
//     res.status(404).json({
//       message: "Invalid Password",
//     });
//   }
// });
