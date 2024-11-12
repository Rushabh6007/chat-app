const express = require('express');
const signUp = require('../controller/SignUp');
const signIn = require('../controller/SignIn');
const userDetails = require('../controller/userDetails');
const signOut = require('../controller/SignOut');
const updateUserDetails = require('../controller/upadateUserDetails');
const uploadFile = require('../controller/uploadFile');
const getAllUserDetails = require('../controller/GetAllUserDetails')
const router = express.Router();

router.use('/upload', uploadFile);

// Other routes
router.post('/signup', signUp);
router.post('/signin', signIn);
router.get('/userDetails', userDetails);
router.get('/signout', signOut);
router.put('/update', updateUserDetails);
router.get('/user',getAllUserDetails)

module.exports = router;
