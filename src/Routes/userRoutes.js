const express = require("express");
const router = express.Router();
// const uthenticateToken = require("../Middlewares/jwt");

const { createUser, logInUser , adminRegister, adminLogIn, getUsers,getUserById, deleteUserById,  getUserByPin, trackingDevicesByPin} = require("../Controllers/userController");
 

router.post("/newUser", createUser);
router.post("/userLogIn", logInUser);
router.post("/newAdmin", adminRegister)
router.post ("/adminLogIn", adminLogIn)
router.get("/getUsers",  getUsers);
router.get('/getUser/:_id',  getUserById)
router.get('/getUserByPin/:pin',    getUserByPin);
router.delete('/deleteUser/:_id',  deleteUserById);

module.exports = router;