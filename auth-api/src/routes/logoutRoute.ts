import express, { Router } from 'express';
import { handleLogout }  from '../controllers/logoutController';

const router: Router = express.Router();

router.get('/', handleLogout);

export default router;