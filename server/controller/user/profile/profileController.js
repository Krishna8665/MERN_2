const User = require("../../../model/userModel");

//get my profile controller
exports.getMyProfile = async (req, res) => {
  const userId = req.user.id;
  const myProfile = await User.findById(userId);
  //send response
  res.status(200).json({
    data: myProfile,
    message: "Profile fetched successfuly",
  });
};

//update my profile controller
// exports.updateMyProfile = async(req,res)=>{
//     const {userName,userEmail}=
// }
