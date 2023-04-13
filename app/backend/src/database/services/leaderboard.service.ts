import { orderBy } from 'lodash';
import MatchService from './match.service';
import match from '../models/match';
import TeamService from './team.Service';
import Team from '../models/Team';
import IMatch from '../interfaces/IMatch';

export default class LeaderboardSevice {
  private _service: MatchService;

  constructor(service: MatchService) {
    this._service = service;
  }

  async leaderboards() {
    const allTeams = await new TeamService(Team).searchForAllTeams();
    const matches = await this._service.searchForMatchesInProgress(false) as IMatch[];

    const teamResults = allTeams.map(({ id }) =>
      (matches.filter((play) => +id === +play.homeTeamId)
        ? matches.filter((play2) => +id === +play2.homeTeamId) : []));

    return teamResults.map((team, index) => ({ name: allTeams[index].teamName,
      totalPoints: team.reduce(LeaderboardSevice.getTotalPoints, 0),
      totalGames: teamResults[index].length,
      totalVictories: team.reduce(LeaderboardSevice.getVictories, 0),
      totalDraws: team.reduce(LeaderboardSevice.getDraws, 0),
      totalLosses: team.reduce(LeaderboardSevice.getLosses, 0),
      goalsFavor: team.reduce(LeaderboardSevice.getGoalsFavor, 0),
      goalsOwn: team.reduce(LeaderboardSevice.getAwayGoals, 0),
      goalsBalance: +(team.reduce(LeaderboardSevice.getGoalsFavor, 0)
      - team.reduce(LeaderboardSevice.getAwayGoals, 0)),
      efficiency: +(((team
        .reduce(LeaderboardSevice.getTotalPoints, 0) / (teamResults[index].length * 3)) * 100)),
    }));
  }

  static getVictories(victory: number, atualMatch: match) {
    if (atualMatch.homeTeamGoals > atualMatch.awayTeamGoals) return victory + 1;
    return victory;
  }

  static getDraws(draw: number, atualMatch2: match) {
    if (atualMatch2.homeTeamGoals === atualMatch2.awayTeamGoals) return draw + 1;
    return draw;
  }

  static getLosses(losses: number, AtualMatch3: match) {
    if (AtualMatch3.homeTeamGoals < AtualMatch3.awayTeamGoals) return losses + 1;
    return losses;
  }

  static getTotalPoints(points: number, atualMatch4: match) {
    if (atualMatch4.homeTeamGoals > atualMatch4.awayTeamGoals) return points + 3;
    if (atualMatch4.homeTeamGoals === atualMatch4.awayTeamGoals) return points + 1;
    return points;
  }

  static getAwayGoals(goal: number, atualMatch5: match) {
    return atualMatch5.awayTeamGoals + goal;
  }

  static getGoalsFavor(goal: number, atualMatch6: match) {
    return atualMatch6.homeTeamGoals + goal;
  }

  async sortLeaderboard() {
    const leaderboard = await this.leaderboards();
    return orderBy(
      leaderboard,
      ['totalPoints', 'totalVictories', 'goalsBalance', 'goalsFavor'],
      ['desc', 'desc', 'desc', 'desc'],
    );
  }
}
