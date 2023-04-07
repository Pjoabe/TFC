import { Request, Response, Router } from 'express';
import match from '../models/match';
import MatchService from '../services/match.service';
import MatchController from '../controllers/match.controller';

const router = Router();
const service = new MatchService(match);
const controller = new MatchController(service);

router.patch('/:id/finish', (req: Request, res: Response) => controller.getAllMatches(req, res));
router.get('/', (req: Request, res: Response) => controller.getAllMatches(req, res));

export default router;
