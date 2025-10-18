const express = require("express");
const router = express.Router();

const { createUser, logInUser , adminRegister, adminLogIn, getUsers} = require("../Controllers/userController");

router.post("/newUsers", createUser);
router.post("/userLogIn", logInUser);
router.post("/newAdmin", adminRegister)
router.post ("/adminLogIn", adminLogIn)
router.get("/getUsers", getUsers);

module.exports = router;