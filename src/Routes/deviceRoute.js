const express=require("express");
const deviceRouter = require("express").Router();

const { createDevice, getDevices } = require("../Controllers/deviceController");
deviceRouter.post("/newDevice", createDevice);
deviceRouter.get("/getDevices", getDevices);

module.exports=deviceRouter;