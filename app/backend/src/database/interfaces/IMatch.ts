import match from '../models/match';

export default interface IMatch extends match {
  homeTeam: {
    id: number,
    teamName: string,
  }
}
