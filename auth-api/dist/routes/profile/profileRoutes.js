"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const updateProfilePic_1 = require("../../controllers/profile/updateProfilePic");
const getProfilePic_1 = require("../../controllers/profile/getProfilePic");
const getUserInfo_1 = require("../../controllers/profile/getUserInfo");
const updateProfileController_1 = require("../../controllers/profile/updateProfileController");
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.put('/updateInfo', updateProfileController_1.UserController);
router.put('/', upload.single('image'), updateProfilePic_1.updateProfilePic);
router.get('/profilePic', getProfilePic_1.getProfilePic);
router.get('/', getUserInfo_1.getUserInfo);
exports.default = router;
//# sourceMappingURL=profileRoutes.js.map