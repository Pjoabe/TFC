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
}
