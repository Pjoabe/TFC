import { ModelStatic } from 'sequelize';
import match from '../models/match';
import Team from '../models/Team';

export default class MatchService {
  private _model: ModelStatic<match>;
  constructor(model: ModelStatic<match>) {
    this._model = model;
  }

  async searchForAllMatches(): Promise<match[]> {
    const allMatches = await this._model.findAll(
      {
        include:
        [
          { model: Team, as: 'awayTeam' },
          { model: Team, as: 'homeTeam' },
        ],
      },
    );
    return allMatches;
  }

  async searchForMatchesInProgress(inProgress: boolean): Promise<match[]> {
    const onGoing = await this._model.findAll(
      {
        where: { inProgress },
        include: [{ model: Team, as: 'awayTeam' },
          { model: Team, as: 'homeTeam' }],
      },
    );
    return onGoing;
  }

  async searchMatchById(id: number) {
    await this._model.update({ inProgress: false }, { where: { id } });
  }
}
