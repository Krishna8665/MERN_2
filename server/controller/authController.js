const User = require("../model/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendEmail = require("../services/sendEmail");

exports.registerUser = async (req, res) => {
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
};

exports.loginUser = async (req, res) => {
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
  //password check
  const isMatched = bcrypt.compareSync(password, userFound[0].userPassword);
  if (!isMatched) {
    
    //generate token
    const token = jwt.sign({ id: userFound[0]._id }, process.env.SECRET_KEY, {
      expiresIn: "30d",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  } else {
    res.status(404).json({
      message: "Invalid Password",
    });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      message: "Please provide Email",
    });
  }
  //check if that email is register or not
  const userExist = await User.find({ userEmail: email });
  if (userExist.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  //send OTP to that email
  const otp = Math.floor(1000 + Math.random() * 9000);
  userExist[0].otp = otp;
  await userExist[0].save();
  await sendEmail({
    email: email,
    subject: "Your OTP for digitalMOMO forgot Password",
    message: `Your OTP is ${otp}.Don't share with anyone.`,
  });
  res.json({
    message: "Forgot Password OTP is sended",
  });
};

//verify Otp
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({
      message: "Please provide email,otp",
    });
  }
  //check if that otp is correct or not for that email
  const userExists = await User.find({ userEmail: email });
  if (userExists.length == 0) {
    return res.status(404).json({
      message: "Email is not registered",
    });
  }
  if (userExists[0].otp !== otp) {
    return res.status(400).json({
      message: "Invalid otp",
    });
  } else
    res.status(200).json({
      message: "otp is correct",
    });
};

// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({
//       message: "Please provide Email",
//     });
//   }
//   //check if that email is register or not
//   const userExist = await User.find({ userEmail: email });
//   if (userExist.length == 0) {
//     return res.status(404).json({
//       message: "Email is not registered",
//     });
//   }
//   //send OTP to that email
//   const Otp = Math.floor(1000 + Math.random() * 9000);
//   await sendEmail({
//     email: "khatrikrissna11@gmail.com",
//     subject: "Hello world this is subject",
//     message: "hello world this is message",
//   });
//   res.json({
//     message: "Email sent successfully!!",
//   });
// };
