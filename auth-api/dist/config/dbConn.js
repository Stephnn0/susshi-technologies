"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
    }
    catch (err) {
        console.error(err);
    }
};
module.exports = connectDB;
//# sourceMappingURL=dbConn.js.map