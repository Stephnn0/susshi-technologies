"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config();
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const verifyJWT_1 = __importDefault(require("./middleware/verifyJWT"));
const registerRoute_1 = __importDefault(require("./routes/registerRoute"));
const loginRoute_1 = __importDefault(require("./routes/loginRoute"));
const logoutRoute_1 = __importDefault(require("./routes/logoutRoute"));
const refreshRoute_1 = __importDefault(require("./routes/refreshRoute"));
const profileRoutes_1 = __importDefault(require("./routes/profile/profileRoutes"));
const adminRoutes_1 = __importDefault(require("./routes/admin/adminRoutes"));
const connectDB = require('./config/dbConn');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const port = process.env.PORT || 3001;
connectDB();
const app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use(cors(corsOptions));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
app.use(cookieParser());
app.use("/api/admin", adminRoutes_1.default);
app.use("/api/user/register", registerRoute_1.default);
app.use("/api/user/login", loginRoute_1.default);
app.use("/api/user/logout", logoutRoute_1.default);
app.use("/api/user/refresh", refreshRoute_1.default);
app.use(verifyJWT_1.default);
app.use("/api/user/profile", profileRoutes_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map