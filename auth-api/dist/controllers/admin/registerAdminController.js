"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleNewUserAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const bcrypt = require('bcrypt');
const handleNewUserAdmin = async (req, res) => {
    try {
        const { user, pwd } = req.body;
        if (!user || !pwd)
            return res.status(400).json({ message: 'Username and password are required.' });
        const duplicate = await Admin_1.default.findOne({ username: user }).exec();
        if (duplicate)
            return res.sendStatus(409);
        const hashedPwd = await bcrypt.hash(pwd, 10);
        const result = await Admin_1.default.create({
            username: user,
            password: hashedPwd,
        });
        console.log(result);
        res.status(201).json({ success: `New user ${user} created!` });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.handleNewUserAdmin = handleNewUserAdmin;
exports.default = { handleNewUserAdmin: exports.handleNewUserAdmin };
//# sourceMappingURL=registerAdminController.js.map