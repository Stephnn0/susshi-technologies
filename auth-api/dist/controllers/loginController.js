"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogin = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleLogin = async (req, res) => {
    try {
        const cookies = req.cookies;
        console.log(`cookie available at login: ${JSON.stringify(cookies)}`);
        const { email, pwd } = req.body;
        if (!email || !pwd)
            return res.status(400).json({ message: 'Email and password are required.' });
        const foundUser = await User_1.default.findOne({ email: email }).exec();
        if (!foundUser)
            return res.sendStatus(401);
        const match = await bcrypt.compare(pwd, foundUser.password);
        if (match) {
            const roles = Object.values(foundUser.roles).filter(Boolean);
            const id = Object.values(foundUser.userId);
            const accessToken = jwt.sign({
                UserInfo: {
                    email: foundUser.email,
                    roles: roles,
                    user: id
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '50m' });
            const newRefreshToken = jwt.sign({ email: foundUser.email }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
            let newRefreshTokenArray = !cookies?.jwt
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);
            if (cookies?.jwt) {
                const refreshToken = cookies.jwt;
                const foundToken = await User_1.default.findOne({ refreshToken }).exec();
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
exports.handleLogin = handleLogin;
exports.default = { handleLogin: exports.handleLogin };
//# sourceMappingURL=loginController.js.map