const UserModel = require("../models/UserModel");

const getAllUser = async () => {
  try {
    const users = await UserModel.find().select('-password'); 
    if (!users || users.length === 0) {
      return {
        message: "No users found",
        logout: true,
      };
    }

    return users;
  } catch (error) {
    throw new Error("Error fetching user details from the database");
  }
};

module.exports = getAllUser;
