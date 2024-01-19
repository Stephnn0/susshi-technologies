import express, { Router } from 'express';
const router: Router = express.Router();
import multer from 'multer';
import { updateProfilePic } from '../../controllers/profile/updateProfilePic';
import { getProfilePic } from '../../controllers/profile/getProfilePic';
import { getUserInfo } from '../../controllers/profile/getUserInfo';
import { UserController } from '../../controllers/profile/updateProfileController';



const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

router.put('/updateInfo', UserController);
router.put('/', upload.single('image'), updateProfilePic);
router.get('/profilePic', getProfilePic);
router.get('/', getUserInfo);

export default router;