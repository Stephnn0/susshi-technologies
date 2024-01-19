import express from "express";
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
    getTop8Services,
    getFirstServiceByCategory
} from "../controllers/serviceControllers";
import multer from 'multer';

//multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const router = express.Router();

//protected route
router.post("/", upload.single('image'), createService);

router.get("/", getAllServices);
router.get("/top8", getTop8Services);
router.get("/bycategory", getFirstServiceByCategory);
router.get("/:id", getServiceById);
router.put("/:id", updateService);
router.delete("/:id", deleteService);


export default router;
