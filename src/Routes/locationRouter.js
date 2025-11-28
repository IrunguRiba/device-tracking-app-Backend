const express=require('express')

const locationRouter=express.Router();
const  authenticateToken = require("../Middlewares/jwt");


module.exports=locationRouter;
