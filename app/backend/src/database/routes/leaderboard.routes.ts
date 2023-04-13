import { Request, Response, Router } from 'express';
import LeaderBoardService from '../services/leaderboard.service';
import LeaderboardController from '../controllers/leaderboard.controller';
import MatchService from '../services/match.service';
import match from '../models/match';

const router = Router();
const service = new LeaderBoardService(new MatchService(match));

const controller = new LeaderboardController(service);

router.get('/home', (req: Request, res: Response) => controller.getLeaderboard(req, res));

export default router;
