
const User = require('../models/user')

exports.getUser = async(req,res,next ) =>{
  const userId = req.userId;
  const userInfo = await User.findById(userId);
  console.log(userInfo)
   res.status(200).json({
    location: userInfo.location,
    userId: userInfo._id,
    email: userInfo.email,
    username: userInfo.username,
    profileTitle: userInfo.profileTitle,
    profileDescription: userInfo.profileDescription
  })
}