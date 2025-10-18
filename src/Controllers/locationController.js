


const socketIo = require('socket.io');
const Device =require('../Models/device')
const Location = require('../Models/location')
const User= require("../Models/user")

//  function getLocationFromFrontEndandSave (httpServer){
        
// const io= socketIo (httpServer,{
//     cors:{
//         origin:"*",
//         methods:["GET","POST"]
//     }
//   });


// io.on('connection', (socket)=>{
//     console.log(`User: ${socket.id} Connected from server`);

//     socket.on('coordinates', async ({latitude, longitude} ) =>{
//         console.log(`Latitude:, ${latitude}, Longitude: ${longitude}`);
// try {
//   const device= await Device.findOne(_id);
//   if(!device){
//     console.log(`Device not found for ${socket.id}`)
//     return;
//   }


// const newDeviceLocation= await  Location.create({
//   latitude,
//     longitude
// })

// await newDeviceLocation.save()
// console.log(`Device ${device.id} new location saved`)
 
// } catch (error) {
//   console.log(error)
// }
//     });

//     socket.on('disconnect',()=>{
//         console.log('user disconnected');
//     });
//   });
    // }


// module.exports={getLocationFromFrontEndandSave};


module.exports ={
  createNewLocation: async (req, res)=>{
const {longitude,  latitude, userId, deviceId }=req.body
    try {
      
      const currentLocation= new Location({
        longitude,  
        latitude, 
      userId, 
         deviceId 

      });
      
      existingUser = await User.findOne( {_id: userId} );
      if (!existingUser) {
        return res
          .status(401)
          .json({
            message: "Cannot register Device to this user, User does not exist"
          });
      }
     
      existingDevice= await Device.findOne({_id: deviceId} );
      if (!existingDevice) {
        return res
          .status(401)
          .json({
            message: "This Device does not exist, kindly register under user"
          });
      }

      const newDeviceLocation = await currentLocation.save();
      if( !existingDevice.location){
        existingDevice.location=[];
      }

existingDevice.location.push(newDeviceLocation._id)
await existingDevice.save();
res.status(200).json({
  message: "New device location saved",
  device: existingDevice.name,
  location: newDeviceLocation

})

    } catch (error) {
      console.error(error.message)
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  },

  getDeviceLocations: async (req, res)=>{
    const {deviceId}= req.params;
try {
  const locations= await Location.find({deviceId}).select("longitude latitude timestamp -_id").sort({timestamp:-1});

if(!locations || locations.length===0){
  return res.status(404).json({message:"This device has no location data"})
}
  res.status(200).json(locations);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching device locations", error });
    }

  }
}