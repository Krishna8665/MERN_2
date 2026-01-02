const User = require("../../../model/userModel");

exports.getUsers = async (req, res) => {
  const userId = req.user.id
  const users = await User.find({_id:{$ne:userId}}).select("+otp", "isOtpVerified");
  if (users.lenght > 1) {
    return res.status(200).json({
      message: "User fetched successfully",
      data: users,
    });
  }
  res.status(404).json({
    message: "User Collection is empty",
    data: [],
  });
};
