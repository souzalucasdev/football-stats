import axios from 'axios';
import { Game } from '@/types/Game';

export const getGames = async (leagueCode: string): Promise<Game[]> => {
  try {
    const response = await axios.get(`/api/games?league=${leagueCode}`);

    const allGames = response.data.matches.map((match: any) => {
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
    });

    const filteredGames = allGames
      .filter((game) => game.rawDate >= new Date())
      .map(({ rawDate, ...rest }) => rest);

    return filteredGames;
  } catch (error) {
    console.error('Failed to find games of the selected league', error);
    return [];
  }
};
