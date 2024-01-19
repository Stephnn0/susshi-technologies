import express, { Router } from 'express';
import { handleNewUser }  from '../controllers/registerController';

const router: Router = express.Router();

router.post('/', handleNewUser);

export default router;