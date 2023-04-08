import { Request, Response, Router } from 'express';
import User from '../models/User';
import LoginService from '../services/login.service';
import LoginController from '../controllers/login.controller';

const router = Router();
const service = new LoginService(User);
const controller = new LoginController(service);

router.post('/', (req: Request, res: Response) => controller.login(req, res));

export default router;
