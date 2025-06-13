import axios from 'axios';
import { Game } from '@/types/Game';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

interface GameWithRawDate extends Game {
  rawDate: Date;
}

export const getGames = async (leagueCode: string): Promise<Game[]> => {
  // if (!leagueCode) {
  //   console.error('Invalid league code, defaulting to PL');
  //   leagueCode = 'PL';
  // }
  try {
    const response = await axios.get(
      `${BASE_URL}/competitions/${leagueCode}/matches`,
      {
        headers: {
          'X-Auth-Token': API_KEY,
        },
      }
    );

    const allGames: GameWithRawDate[] = response.data.matches.map(
      (match: any) => {
        const dateTime = new Date(match.utcDate);
        const date = dateTime.toLocaleDateString('pt-BR');
        const time = dateTime.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });

        return {
          id: match.id,
          homeTeam: match.homeTeam.name,
          awayTeam: match.awayTeam.name,
          date,
          time,
          rawDate: dateTime,
        };
      }
    );

    const filteredGames = allGames
      .filter((game) => game.rawDate >= new Date())
      .map(({ rawDate, ...rest }) => rest);

    return filteredGames;
  } catch (error) {
    console.error('Failed to find games of the selected league', error);
    return [];
  }
};
