import express, { Router } from 'express';
const router: Router = express.Router();
import { handleLoginAdmin } from '../../controllers/admin/loginAdminController';
import { handleLogoutAdmin } from '../../controllers/admin/logoutAdminController';
import { handleRefreshTokenAdmin } from '../../controllers/admin/refreshAdminController';
import { handleNewUserAdmin } from '../../controllers/admin/registerAdminController';




router.post('/login', handleLoginAdmin);
router.get('/logout', handleLogoutAdmin);
router.get('/refresh', handleRefreshTokenAdmin);
router.post('/register', handleNewUserAdmin);


export default router;