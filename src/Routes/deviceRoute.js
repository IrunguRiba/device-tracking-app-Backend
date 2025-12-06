const express=require("express");
const deviceRouter = require("express").Router();
const authenticateToken = require("../Middlewares/jwt");

const { registerMyDevice, getMyDeviceInfo, updateMyDevice, deleteMyDevice, getAllDevices } = require("../Controllers/deviceController");
deviceRouter.post("/registerMyDevice/:_id", authenticateToken, registerMyDevice);
deviceRouter.get("/getAllDevices", authenticateToken,  getAllDevices);
deviceRouter.get("/getMyDeviceInfo/:_id", authenticateToken,  getMyDeviceInfo);
deviceRouter.put('/updateMyDevice/:_id', authenticateToken, updateMyDevice);
deviceRouter.delete('/deleteMyDevice/:_id', authenticateToken, deleteMyDevice);

module.exports=deviceRouter;