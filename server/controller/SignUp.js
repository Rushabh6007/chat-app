const UserModel = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
async function signUp(request, response) {
  try {
    const { firstname, lastname, email, password, mobileno, profile_pic } =
      request.body;
      console.log(request.body);
    const checkMobileno = await UserModel.findOne({ mobileno });
    // const checkEmail = await UserModel.findOne({email} 
    if (checkMobileno) {
      return response.status(400).json({
        message: "Already User Exists"
      });
    }
    // if(checkEmail){
    //    return response.status(400).json({
    //                message: "Already User Email Exists",
    //                error: true
    //    })
    // }
    const salt = await bcryptjs.genSalt(10);
    const hasepassword = await bcryptjs.hash(password, salt);
    const payload = {
      firstname,
      lastname,
      email,
      mobileno,
      profile_pic,
      password: hasepassword,
    };
    const user = new UserModel(payload);
    const userSave = await user.save();

    console.log(userSave);
    
 
    return response.status(201).json({
      message: "User Created Successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}
module.exports = signUp;
