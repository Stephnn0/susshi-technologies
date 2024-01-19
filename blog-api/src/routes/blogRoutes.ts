import express from "express";
import {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getLastBlogPost
} from "../controllers/blogController";
import multer from 'multer';

//multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();


router.post("/", upload.array('images', 3), createBlogPost);
router.get("/" ,getAllBlogPosts);

router.get("/first", getLastBlogPost);

router.get("/:id", getBlogPostById);
router.put("/:id", updateBlogPost);
router.delete("/:id", deleteBlogPost);

export default router;
