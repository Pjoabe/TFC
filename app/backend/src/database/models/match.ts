import { Model, INTEGER, BOOLEAN } from 'sequelize';
import db from '.';
import Team from './Team';

class match extends Model {
  declare id: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: number;
  declare homeTeamId: boolean;
}

match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamId: {
    allowNull: false,
    type: INTEGER,
  },
  awayTeamGoals: {
    allowNull: false,
    type: INTEGER,
  },
  inProgress: {
    allowNull: false,
    type: BOOLEAN,
  },
  homeTeamId: {
    allowNull: false,
    type: INTEGER,
  },
}, {
  sequelize: db,
  timestamps: false,
  underscored: true,
});

match.belongsTo(Team, { foreignKey: 'away_team_id', as: 'awayTeam' });
match.belongsTo(Team, { foreignKey: 'home_team_id', as: 'homeTeam' });

Team.hasMany(match, { foreignKey: 'away_team_id', as: 'awayTeam' });
Team.hasMany(match, { foreignKey: 'home_team_id', as: 'homeTeam' });

export default match;
