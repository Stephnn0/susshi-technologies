"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLoginAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleLoginAdmin = async (req, res) => {
    try {
        const cookies = req.cookies;
        const { user, pwd } = req.body;
        if (!user || !pwd)
            return res.status(400).json({ message: 'Username and password are required.' });
        const foundUser = await Admin_1.default.findOne({ username: user }).exec();
        if (!foundUser)
            return res.sendStatus(401);
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const accessToken = jwt.sign({
                UserInfo: {
                    username: foundUser.username,
                    roles: roles,
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
            const newRefreshToken = jwt.sign({ username: foundUser.username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            let newRefreshTokenArray = !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await Admin_1.default.findOne({ refreshToken }).exec();
                if (!foundToken) {
                    console.log('attempted refresh token reuse at login!');
                    newRefreshTokenArray = [];
                }
                res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
            }
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            res.cookie('jwt', newRefreshToken, { httpOnly: true, secure: true, sameSite: 'none', maxAge: 24 * 60 * 60 * 1000 });
            res.json({ accessToken });
        }
        else {
            res.sendStatus(401);
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};
exports.handleLoginAdmin = handleLoginAdmin;
exports.default = { handleLoginAdmin: exports.handleLoginAdmin };
//# sourceMappingURL=loginAdminController.js.map