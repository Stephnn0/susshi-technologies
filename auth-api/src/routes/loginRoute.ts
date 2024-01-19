import express, { Router } from 'express';
import { handleLogin }  from '../controllers/loginController';

const router: Router = express.Router();

router.post('/', handleLogin);

export default router;