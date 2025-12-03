const mongoose = require("mongoose");
const { Server } = require("socket.io");
const Device = require('../Models/device');
const Location = require('../Models/location');
const User = require("../Models/user");


function setupSocketServer(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.use((socket, next) => {
    const cookie = socket.request.headers.cookie;
    if (cookie) {
      const cookies = cookieParser.parse(cookie);
      const sessionId = cookies['connect.sid']; 
      socket.sessionID = sessionId;  
      next();
    } else {
      next(new Error("No session cookie found"));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);
    socket.emit('connected', 'Connected to the socket server!');

    socket.on('coordinates', async ({ latitude, longitude, userId, deviceId, visitorId, extendedResult, token }) => {
      try {
        socket.request.session.visitorId = visitorId;
        socket.request.session.extendedResult = extendedResult;
        socket.request.session.token = token;
        socket.request.session.save(); 

        console.log("Session data saved:", socket.request.session);
        const existingUser = await User.findById(userId);
        if (!existingUser) return console.log(`User not found: ${userId}`);

        const existingDevice = await Device.findById(deviceId);
        if (!existingDevice) return console.log(`Device not found: ${deviceId}`);
        const newDeviceLocation = await Location.create({ latitude, longitude, userId, deviceId });
        existingDevice.location = existingDevice.location || [];
        existingDevice.location.push(newDeviceLocation._id);
        await existingDevice.save();

        socket.emit('location_saved', newDeviceLocation);
        console.log(`Location stored for user: ${userId}, device: ${deviceId}`);

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
