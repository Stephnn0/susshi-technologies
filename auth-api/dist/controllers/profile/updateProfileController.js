"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const User_1 = __importDefault(require("./../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const { pwd, firstName, lastName, email } = req.body;
        if (!email || !firstName || !lastName || !pwd) {
            return res.status(400).json({ message: 'First Name, Last Name, and Email are required.' });
        }
        const user = await User_1.default.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        if (email) {
            user.email = email;
        }
        if (firstName) {
            user.firstName = firstName;
        }
        if (lastName) {
            user.lastName = lastName;
        }
        if (pwd) {
            const hashedPwd = await bcrypt_1.default.hash(pwd, 10);
            user.password = hashedPwd;
        }
        await user.save();
        res.status(200).json({ success: `User information updated for user ${user.email}` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.UserController = UserController;
exports.default = exports.UserController;
//# sourceMappingURL=updateProfileController.js.map