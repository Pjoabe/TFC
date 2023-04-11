import { Request, Response } from 'express';
import matchService from '../services/match.service';

export default class MatchController {
  private _service: matchService;

  constructor(service: matchService) {
    this._service = service;
  }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query as { inProgress?: string };
    const response = inProgress
      ? await this._service.searchForMatchesInProgress(inProgress === 'true')
      : await this._service.searchForAllMatches();
    return res.status(200).json(response);
  }

  async getMatchById(req: Request, res: Response) {
    const { id } = req.params;
    await this._service.searchMatchById(+id);
    return res.status(200).json({ message: 'Finished' });
  }

  async updateScoreById(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await this._service.updateResultById(homeTeamGoals, awayTeamGoals, +id);

    return res.status(200).json({ message: 'Finished' });
  }

  createMatchResult = async (req: Request, res: Response) => {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const findId = await this._service.searchById(homeTeamId, awayTeamId);
    if (!findId || findId.length > 1) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }

    try {
      const result = await this._service.createMatchResult(
        homeTeamId,
        awayTeamId,
        homeTeamGoals,
        awayTeamGoals,
      );
      return res.status(201).json(result);
    } catch (error) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
  };
}
