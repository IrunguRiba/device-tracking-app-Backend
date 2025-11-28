const express = require("express");
const app = express();

require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/Routes/userRoutes");
const deviceRouter = require("./src/Routes/deviceRoute");
const trackingRoute=require('./src/Routes/trackingRoute')
const {setupSocketServer}=require("./src/Controllers/locationController");
const locationRouter= require("./src/Routes/locationRouter")
const http = require("http")
const httpServer=http.createServer(app);
const crypto = require('crypto');
const authenticateToken = require("./src/Middlewares/jwt");





app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
  }
));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("MongoDB connected"));

setupSocketServer(httpServer);


app.use('/api', router);
app.use('/api/devices', deviceRouter);
app.use('/api', locationRouter);
app.use('/api', trackingRoute)
httpServer.listen(PORT, () => console.log(`httpServer is running on port ${PORT}`));


// use this to generate secrets... works just fine
// const secretToken= crypto.randomBytes(32).toString('hex');
// const refreshToken= crypto.randomBytes(32).toString('hex');
// console.log("SECRET_TOKEN: ", secretToken);
// console.log("REFRESH_TOKEN: ", refreshToken);