const Device = require("../Models/device");
const User = require("../Models/user");
const Locations = require("../Models/location");

// Create and Save a new Device

module.exports = {
  createDevice: async (req, res) => {
    const { name, type, model, description, userId } = req.body;
    try {
      const newDevice = new Device({
        name,
        type,
        model,
        description,
        user: userId,
      });
      existingUser = await User.findOne({ _id: userId });
      if (!existingUser) {
        return res
          .status(401)
          .json({
            message: "Cannot register Device to this user, User does not exist",
            error,
          });
      }

      const savedDevice = await newDevice.save();


        existingUser.devices.push(savedDevice._id);
        await existingUser.save();
        
      res.status(201).json(
        { 
            message: "Device created success", savedDevice,
            user: existingUser.userName 
    }
        );
    } catch (error) {
      console.error(error);

      res.status(500).json({ message: "Error creating device", error });
    }
  },
  getDevices: async (req, res) => {

    try {
      const devices = await Device.find().populate("user", "userName email");

    
      res.status(200).json(devices);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching devices", error });
    }
  },
  updateDeviceInfo: async (req, res) => {},
  deleteDevice: async (req, res) => {},
};