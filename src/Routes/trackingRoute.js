const express=require('express')

const trackingRoute= express.Router()
const authenticateToken = require("../Middlewares/jwt");

const { trackingDevicesByPin,  deleteThisDeviceFromTrackedDevices}=require("../Controllers/trackingController")

trackingRoute.post('/track/:_id', authenticateToken, trackingDevicesByPin);
trackingRoute.delete('/deleteTrackedDevice/:_id/remove/:remove', authenticateToken,  deleteThisDeviceFromTrackedDevices)

module.exports = trackingRoute;