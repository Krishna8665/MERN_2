const User = require("../../../model/userModel");

exports.getUsers = async (req, res) => {
  const userId = req.user.id;
  const users = await User.find({ _id: { $ne: userId } }).select("-otp -isOtpVerified");
  if (users.length > 0) {
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

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).json({
      message: "Please provide userID",
    });
  }
  //check if that userId users exists or not
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      message: "User not found with that userId",
    });
  } else {
    await User.findByIdAndDelete(userId);
    res.status(200).json({
      message: "User deleted successfully",
    });
  }
};
