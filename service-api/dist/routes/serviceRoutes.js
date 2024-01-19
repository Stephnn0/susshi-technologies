"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const serviceControllers_1 = require("../controllers/serviceControllers");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post("/", upload.single('image'), serviceControllers_1.createService);
router.get("/", serviceControllers_1.getAllServices);
router.get("/top8", serviceControllers_1.getTop8Services);
router.get("/bycategory", serviceControllers_1.getFirstServiceByCategory);
router.get("/:id", serviceControllers_1.getServiceById);
router.put("/:id", serviceControllers_1.updateService);
router.delete("/:id", serviceControllers_1.deleteService);
exports.default = router;
//# sourceMappingURL=serviceRoutes.js.map