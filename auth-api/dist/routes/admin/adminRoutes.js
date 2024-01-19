"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const loginAdminController_1 = require("../../controllers/admin/loginAdminController");
const logoutAdminController_1 = require("../../controllers/admin/logoutAdminController");
const refreshAdminController_1 = require("../../controllers/admin/refreshAdminController");
const registerAdminController_1 = require("../../controllers/admin/registerAdminController");
router.post('/login', loginAdminController_1.handleLoginAdmin);
router.get('/logout', logoutAdminController_1.handleLogoutAdmin);
router.get('/refresh', refreshAdminController_1.handleRefreshTokenAdmin);
router.post('/register', registerAdminController_1.handleNewUserAdmin);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map