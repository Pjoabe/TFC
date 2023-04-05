import { Request, Response, Router } from 'express';
import Team from '../models/Team';
import TeamService from '../services/team.Service';
import TeamController from '../controllers/team.Controller';

const router = Router();
const service = new TeamService(Team);
const controller = new TeamController(service);

router.get('/:id', (req: Request, res: Response) => controller.getTeamById(req, res));
router.get('/', (req: Request, res: Response) => controller.getAllTeams(req, res));

export default router;
