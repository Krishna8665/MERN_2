const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../model/userModel");
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    //console.log(token)
    if (!token) {
      res.status(403).json({
        message: "Please send token",
      });
    }
    //token pathayo vaney k garne tw ani verify if token is legit
    // jwt.verify(token, process.env.SECRET_KEY, (err, success) => {
    //   if (err) {
    //     res.status(400).json({
    //       message: "Invalid Token",
    //     });
    //   } else {
    //     res.status(200).json({
    //       message: "valid Token",
    //     });
    //   }
    // });
    //Alternate

    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    //console.log(decoded)
    const doesUserExist = await User.findOne({ _id: decoded.id });

    if (!doesUserExist) {
      return res.status(404).json({
        message: "User doesnt exist with that token/id",
      });
    }
    req.user = doesUserExist;
    next();
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = isAuthenticated;
