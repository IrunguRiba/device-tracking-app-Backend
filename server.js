const express = require("express");
const app = express();
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
require("dotenv").config();
const session=require('express-session')
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");


app.use(cors(
  {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true 
  }
));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 4000;

mongoose.connect(process.env.MONGO_URL, {}).then(() => console.log("MongoDB connected"));

setupSocketServer(httpServer);

app.use(cookieParser()); 

app.use(session({
  secret: "joel_riba", 
  saveUninitialized: false, 
  resave: false, 
  cookie: {
    maxAge: 60000 * 60 
  }
}));

app.use('/api', router);
app.use('/api/devices', deviceRouter);
app.use('/api', locationRouter);
app.use('/api', trackingRoute)
httpServer.listen(PORT, () => console.log(`httpServer is running on port ${PORT}`));


// This generate secret tokens... works just fine
// const secretToken= crypto.randomBytes(32).toString('hex');
// const refreshToken= crypto.randomBytes(32).toString('hex');
// console.log("SECRET_TOKEN: ", secretToken);
// console.log("REFRESH_TOKEN: ", refreshToken);