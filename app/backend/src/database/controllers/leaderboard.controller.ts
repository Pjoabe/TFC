import { Request, Response } from 'express';
import leaderboard from '../services/leaderboard.service';

export default class LeaderboardController {
  private _serviceHome: leaderboard;

  constructor(serviceHome: leaderboard) {
    this._serviceHome = serviceHome;
  }

  async getLeaderboard(_req: Request, res: Response) {
    const result = await this._serviceHome.sortLeaderboard();
    return res.status(200).json(result);
  }
}
