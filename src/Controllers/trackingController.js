const User = require("../Models/user");
const Device = require("../Models/device");
const mongoose = require("mongoose");

module.exports = {
  trackingDevicesByPin: async (req, res) => {
    const { _id } = req.params;
    const { pin } = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }

      const existingUser = await User.findById(_id);
      if (!existingUser) {
        return res.status(400).json({ message: "User not found! Wrong ID" });
      }

      const userToBeTracked = await User.findOne({ pin })
      if (!userToBeTracked) {
        return res
          .status(400)
          .json({ message: "Wrong Pin! Could not find user to be tracked." });
      }

     

      if (!userToBeTracked.deviceInfo || userToBeTracked.deviceInfo === null) {
        return res
          .status(400)
          .json({
            message: "The user to be tracked has not added their device for tracking.",
          });
      }

      if (!existingUser.trackedDevices) {
        existingUser.trackedDevices = [];
      }


      const deviceToTrack = userToBeTracked.deviceInfo;


      const isAlreadyTracked = existingUser.trackedDevices.some(
        (trackedDevice) => trackedDevice.deviceInfo.toString() === deviceToTrack._id.toString()
      );

      if (!isAlreadyTracked) {
        existingUser.trackedDevices.push({
          deviceInfo: deviceToTrack._id,
        });
      } else {
        return res.status(400).json({ message: "You are already tracking this device." });
      }
      
      await existingUser.save();

      res.status(200).json({
        message: "You are now tracking the device.",
        trackedDevice: deviceToTrack,
      });
      console.log("Updated tracked devices: ", existingUser.trackedDevices);
    } catch (error) {
      console.error("Something went wrong!", error);
      res.status(500).json({
        message: "Internal Server error",
        error: error.message || error,
      });
    }
  },

  deleteThisDeviceFromTrackedDevices: async (req, res) => {
    const { _id, remove } = req.params; 
  
    try {
      if (!mongoose.Types.ObjectId.isValid(_id) || !mongoose.Types.ObjectId.isValid(remove)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
  
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      const index = user.trackedDevices.findIndex(
        d => d.deviceInfo.toString() === remove
      );
  
      if (index === -1) {
        return res.status(400).json({ message: "Device not tracked by this user" });
      }
      const removedDevice = user.trackedDevices.splice(index, 1)[0];
      await user.save();
  
      res.status(200).json({
        message: `Device ${removedDevice.deviceInfo} has been removed from tracked devices successfully`,
        removedDeviceId: removedDevice.deviceInfo
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  }  
};
