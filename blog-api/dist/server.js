"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require('path');
require('dotenv').config({ path: "../.env" });
const connectDB = require('./config/dbConn');
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const blogRoutes_1 = __importDefault(require("./routes/blogRoutes"));
const s3_1 = require("./s3");
const port = process.env.PORT || 3005;
connectDB();
const app = (0, express_1.default)();
var corsOptions = {
    origin: "http://localhost:5173",
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get('/api/blog-s3Url', async (req, res) => {
    try {
        const url = await (0, s3_1.generateUploadURL)();
        res.send({ url });
    }
    catch (err) {
        console.log(err);
    }
});
app.use("/api/blog", blogRoutes_1.default);
mongoose_1.default.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});
//# sourceMappingURL=server.js.map