const express=require('express')

const locationRouter=express.Router();

const {createNewLocation, getDeviceLocations}= require("../Controllers/locationController")

locationRouter.post('/newLocation', createNewLocation);
locationRouter.get('/deviceLocations/:deviceId', getDeviceLocations);

module.exports=locationRouter;
