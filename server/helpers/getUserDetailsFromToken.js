const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

const getUserDetailsFromToken = async (token) => {
  if (!token) {
    return {
      message: "Session expired, please login again",
      logout: true,
    };
  }

  try {
    const decode = await jwt.verify(token, process.env.JWT_SECREAT_KEY);
//     console.log("Decoded Token:", decode);

    const user = await UserModel.findOne({ mobileno: decode.mobileno }).select('-password');
    //console.log("User Retrieved:", user);

    if (!user) {
      return {
        message: "User not found",
        logout: true,
      };
    }

    return user;
  } catch (error) {
    return {
      message: "Invalid or expired token",
      logout: true,
    };
  }
};

module.exports = getUserDetailsFromToken;
