const getAllUserDetailsFromDatabase = require("../helpers/getAllUser");

async function getAllUserDetails(request, response) {
  try {
    const users = await getAllUserDetailsFromDatabase();
    
    return response.status(200).json({
      message: "All User Details",
      data: users
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = getAllUserDetails;
