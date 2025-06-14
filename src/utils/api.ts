import axios from 'axios';
import { Game } from '@/types/Game';

type ApiMatch = {
  id: number;
  utcDate: string;
  homeTeam: { name: string };
  awayTeam: { name: string };
};

export const getGames = async (leagueCode: string): Promise<Game[]> => {
  try {
    const response = await axios.get(`/api/games?league=${leagueCode}`);

    const matches = response.data.matches as unknown[];

    const filteredGames: Game[] = matches
      .filter((match): match is ApiMatch => {
        return (
          typeof match === 'object' &&
          match !== null &&
          'utcDate' in match &&
          typeof (match as any).utcDate === 'string'
        );
      })
      .filter((match) => new Date(match.utcDate) >= new Date())
      .map((match) => {
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
