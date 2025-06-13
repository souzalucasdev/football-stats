import axios from 'axios';
import { Game } from '@/types/Game';

export const getGames = async (leagueCode: string): Promise<Game[]> => {
  try {
    const response = await axios.get(`/api/games?league=${leagueCode}`);

    const filteredGames: Game[] = response.data.matches
      .filter((match: any) => new Date(match.utcDate) >= new Date())
      .map((match: any) => {
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
        };
      });

    return filteredGames;
  } catch (error) {
    console.error('Failed to find games of the selected league', error);
    return [];
  }
};
