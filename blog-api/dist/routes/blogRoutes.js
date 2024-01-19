"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const blogController_1 = require("../controllers/blogController");
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
const router = express_1.default.Router();
router.post("/", upload.array('images', 3), blogController_1.createBlogPost);
router.get("/", blogController_1.getAllBlogPosts);
router.get("/first", blogController_1.getLastBlogPost);
router.get("/:id", blogController_1.getBlogPostById);
router.put("/:id", blogController_1.updateBlogPost);
router.delete("/:id", blogController_1.deleteBlogPost);
exports.default = router;
//# sourceMappingURL=blogRoutes.js.map