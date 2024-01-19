require('dotenv').config();

import express from "express";
import mongoose from "mongoose";
import verifyJWT from "./middleware/verifyJWT";
import registerRoute from "./routes/registerRoute"
import loginRoute from "./routes/loginRoute"
import logoutRoute from "./routes/logoutRoute"
import refreshRoute from "./routes/refreshRoute"
import profileRoutes from "./routes/profile/profileRoutes"

import adminRoutes from "./routes/admin/adminRoutes"

const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const cors = require('cors')


const port = process.env.PORT || 3001;

connectDB();

const app = express();

//PRODUCTION
// var corsOptions = {
//   origin: ["https://susshitechnologies.com","https://bahiascience.com"],
//   credentials: true
// };

//TESTING
var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true
};


app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// admin routes
app.use("/api/admin", adminRoutes);

// auth routes
app.use("/api/user/register", registerRoute);
app.use("/api/user/login", loginRoute);
app.use("/api/user/logout", logoutRoute);
app.use("/api/user/refresh", refreshRoute);

// user routes
app.use(verifyJWT);
app.use("/api/user/profile", profileRoutes)




mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });
    });