const express = require("express");
const router = express.Router();
const authenticateToken = require("../Middlewares/jwt");

const { createUser, logInUser ,  adminRegister, getUserByEmailForValidation, adminLogIn, getUsers,getUserById, deleteUserById,  getUserByPin, trackingDevicesByPin} = require("../Controllers/userController");
 

router.post("/newUser",  createUser);
router.post("/userLogIn", logInUser);
router.post("/newAdmin", adminRegister)
router.post ("/adminLogIn", adminLogIn)
router.post('/userByEmail', getUserByEmailForValidation)
router.get("/getUsers", authenticateToken, getUsers);
router.get('/getUser/:_id', authenticateToken,  getUserById)
router.get('/getUserByPin/:pin', authenticateToken,   getUserByPin);
router.delete('/deleteUser/:_id', authenticateToken,  deleteUserById);

module.exports = router;