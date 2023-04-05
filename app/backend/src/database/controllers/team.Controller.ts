import { Request, Response } from 'express';
import TeamService from '../services/team.Service';

export default class TeamController {
  private _service: TeamService;

  constructor(service: TeamService) {
    this._service = service;
  }

  public async getAllTeams(_req: Request, res: Response) {
    const response = await this._service.searchForAllTeams();
    return res.status(200).json(response);
  }
}
