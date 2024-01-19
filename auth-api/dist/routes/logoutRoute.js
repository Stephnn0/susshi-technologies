"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logoutController_1 = require("../controllers/logoutController");
const router = express_1.default.Router();
router.get('/', logoutController_1.handleLogout);
exports.default = router;
//# sourceMappingURL=logoutRoute.js.map