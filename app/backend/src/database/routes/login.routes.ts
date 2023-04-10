import { Request, Response, Router } from 'express';
import User from '../models/User';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';
import validateToken from '../middlewares/validateToken';
import validateUser from '../middlewares/validateUser';

const router = Router();
const service = new LoginService(User);
const controller = new LoginController(service);

router.post('/', validateUser, (req: Request, res: Response) => controller.login(req, res));
router.get('/role', validateToken, (req: Request, res: Response) => controller.role(req, res));

export default router;
