"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleLogoutAdmin = void 0;
const Admin_1 = __importDefault(require("../../models/Admin"));
const handleLogoutAdmin = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
        res.sendStatus(204);
        return;
    }
    const refreshToken = cookies.jwt;
    const foundUser = await Admin_1.default.findOne({ refreshToken }).exec();
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
exports.handleLogoutAdmin = handleLogoutAdmin;
exports.default = { handleLogoutAdmin: exports.handleLogoutAdmin };
//# sourceMappingURL=logoutAdminController.js.map