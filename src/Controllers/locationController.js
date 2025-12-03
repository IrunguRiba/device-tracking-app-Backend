const mongoose = require("mongoose");
const { Server } = require("socket.io");
const Device = require('../Models/device');
const Location = require('../Models/location');
const User = require("../Models/user");
const crypto = require('crypto');
const Session=require('../Models/session')
function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.emit('connected', 'Connected to the socket server!');

    socket.on('coordinates', async ({ latitude, longitude, userId, deviceId, visitorId }) => {
      try {
        const existingUser = await User.findById(userId);
        if (!existingUser) return console.log(`User not found: ${userId}`);

        const existingDevice = await Device.findById(deviceId);
        if (!existingDevice) return console.log(`Device not found: ${deviceId}`);

        const newDeviceLocation = await Location.create({ latitude, longitude, userId, deviceId });
        existingDevice.location = existingDevice.location || [];
        existingDevice.location.push(newDeviceLocation._id);
        await existingDevice.save();
console.log("Visitor id",visitorId)
        const existingVisitor = await Session.findOne({ visitorId });

    

        if (!existingVisitor) {

          const newSession = new Session({
            visitorId: visitorId,
            userId: userId,
          });
          const savedSession = await newSession.save();
          console.log("New session created:", savedSession);
        } else {
          const isSessionExpired = existingVisitor.expiresAt < Date.now();
          
          if (isSessionExpired) {
            existingVisitor.expiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000;
            await existingVisitor.save();
            console.log("Session expired, new expiration date set:", existingVisitor);
          } else {
            console.log("Session is still valid:", existingVisitor);
          }
        }
        

        
        console.log(`Location stored for user: ${userId}, device: ${deviceId}, visitorId: ${visitorId}`);
        socket.emit('location_saved', newDeviceLocation);
      } catch (error) {
        console.error("Error saving location:", error);
      }
    });
    socket.on("disconnect", () => {
      console.log(`Client disconnected: ${socket.id}`);
    });    
  });
}




module.exports = { setupSocketServer };
