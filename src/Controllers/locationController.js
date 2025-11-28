const mongoose = require("mongoose");
const { Server } = require("socket.io");
const Device = require('../Models/device');
const Location = require('../Models/location');
const User = require("../Models/user");
const crypto = require('crypto');

// Socket server setup
function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('coordinates', async ({ latitude, longitude, userId, deviceId }) => {
      try {
        const existingUser = await User.findById(userId);
        if (!existingUser) return console.log(`User not found: ${userId}`);

        const existingDevice = await Device.findById(deviceId);
        if (!existingDevice) return console.log(`Device not found: ${deviceId}`);

        const newDeviceLocation = await Location.create({ latitude, longitude, userId, deviceId });
        existingDevice.location = existingDevice.location || [];
        existingDevice.location.push(newDeviceLocation._id);
        await existingDevice.save();

        console.log(`Location stored for user: ${userId}, device: ${deviceId}`);
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
