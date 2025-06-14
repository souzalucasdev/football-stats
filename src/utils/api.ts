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

    const matches = response.data?.matches as unknown[];

    const filteredGames: Game[] = matches
      .filter((match): match is ApiMatch => {
        return (
          typeof match === 'object' &&
          match !== null &&
          'id' in match &&
          'utcDate' in match &&
          'homeTeam' in match &&
          'awayTeam' in match &&
          typeof (match as Record<string, unknown>).utcDate === 'string' &&
          typeof (match as Record<string, unknown>).id === 'number' &&
          typeof (match as Record<string, unknown>).homeTeam === 'object' &&
          typeof (match as Record<string, unknown>).awayTeam === 'object'
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
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        'Failed to find games of the selected league:',
        error.message
      );
    } else {
      console.error('Unknown error occurred while fetching games');
    }
    return [];
  }
};
