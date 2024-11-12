const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
async function signIn(request, response) {
  try {
    const { mobileno, password } = request.body;

    const user = await UserModel.findOne({ mobileno });

    if (!user) {
      return response.status(400).json({
        message: "User does not exist"
      });
    }
 
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);

    if (!isPasswordCorrect) {
      return response.status(400).json({
        message: "Password is Wrong",
        error: true,
      });
    }

    const tokenData = {
      mobileno: user.mobileno,
    };

    const token = await jwt.sign(tokenData, process.env.JWT_SECREAT_KEY, {
      expiresIn: "1d",
    });

    const cookieOption = {
      http: true,
      secure: true,
    };

    return response.cookie("token", token, cookieOption).status(200).json({
      message: "Login successfully...",
      token: token,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = signIn;
