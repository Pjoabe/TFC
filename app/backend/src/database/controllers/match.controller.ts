import { Request, Response } from 'express';
import matchService from '../services/match.service';

export default class MatchController {
  private _service: matchService;
  constructor(service: matchService) {
    this._service = service;
  }

  async getAllMatches(_req: Request, res: Response) {
    const response = await this._service.searchForAllMatches();
    return res.status(200).json(response);
  }
}
