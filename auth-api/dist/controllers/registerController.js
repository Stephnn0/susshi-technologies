"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcrypt');
const uuid_1 = require("uuid");
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function isStrongPassword(password) {
    const passwordRegex = /^(?=(.*[a-z]){3,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    return passwordRegex.test(password);
}
const handleNewUser = async (req, res) => {
    try {
        const { pwd, firstName, lastName, email } = req.body;
        if (!email || !pwd || !firstName || !lastName)
            return res.status(400).json({ message: 'Username and password are required.' });
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: 'Invalid email address.' });
        }
        if (!isStrongPassword(pwd)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long and contain a mix of letters, numbers, and special characters.',
            });
        }
        const duplicate = await User_1.default.findOne({ email: email }).exec();
        if (duplicate)
            return res.sendStatus(409);
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const id = (0, uuid_1.v4)();
        const result = await User_1.default.create({
            userId: id,
            email: email,
            firstName: firstName,
            lastName: lastName,
            password: hashedPwd,
        });
        res.status(201).json({ success: `New user ${email} created!` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.handleNewUser = handleNewUser;
exports.default = { handleNewUser: exports.handleNewUser };
//# sourceMappingURL=registerController.js.map