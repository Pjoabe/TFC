import { ModelStatic } from 'sequelize';
import Team from '../models/Team';

export default class TeamService {
  private _model: ModelStatic<Team>;
  constructor(model: ModelStatic<Team>) {
    this._model = model;
  }

  public async searchForAllTeams(): Promise<Team[]> {
    const allTeams = await this._model.findAll();
    return allTeams;
  }

  async searchById(id: string): Promise<Team | null> {
    const teamById = await this._model.findByPk(id);
    return teamById;
  }
}
