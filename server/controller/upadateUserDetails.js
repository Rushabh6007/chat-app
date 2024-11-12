// const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
// const UserModel = require("../models/UserModel");

// async function updateUserDetails(request, response) {
//     try {
//         const token = request.cookies.token || "";

//         const user = await getUserDetailsFromToken(token);

//         const { firstname, lastname, email } = request.body;

//         const updateUser = await UserModel.updateOne(
//             { mobileno: user.mobileno },
//             {
//                 firstname,
//                 lastname,
//                 email,
                
//             }
//         );

//         const userInformation = await UserModel.findOne({ mobileno: user.mobileno });

//         return response.json({
//             message: "User Updated Successfully....",
//             data: userInformation,
//             success: true,
//         });
//     } catch (error) {
//         return response.status(500).json({
//             message: error.message || error,
//             error: true,
//         });
//     }
// }

// module.exports = updateUserDetails;
const getUserDetailsFromToken = require("../helpers/getUserDetailsFromToken");
const UserModel = require("../models/UserModel");

async function updateUserDetails(request, response) {
    try {
        const token = request.cookies.token || "";
        const user = await getUserDetailsFromToken(token);

        const { firstname, lastname, email } = request.body;

        const updateUser = await UserModel.updateOne(
            { mobileno: user.mobileno },
            {
                firstname,
                lastname,
                email,
            }
        );

        if (updateUser.nModified === 0) {
            return response.status(404).json({
                message: "No user found with this mobile number or no changes made.",
                success: false,
            });
        }

        const userInformation = await UserModel.findOne({ mobileno: user.mobileno });

        return response.json({
            message: "User Updated Successfully.",
            data: userInformation,
            success: true,
        });
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
        });
    }
}

module.exports = updateUserDetails;
