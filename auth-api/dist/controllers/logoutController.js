"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogout = void 0;
const User_1 = __importDefault(require("../models/User"));
const handleLogout = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }
    const refreshToken = cookies.jwt;
    const foundUser = await User_1.default.findOne({ refreshToken }).exec();
    if (!foundUser) {
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        res.sendStatus(204);
        return;
    }
    foundUser.refreshToken = foundUser.refreshToken.filter((rt) => rt !== refreshToken);
    const result = await foundUser.save();
    console.log(result);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.sendStatus(204);
};
exports.handleLogout = handleLogout;
exports.default = { handleLogout: exports.handleLogout };
//# sourceMappingURL=logoutController.js.map