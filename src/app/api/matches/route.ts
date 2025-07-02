import { NextRequest } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

interface Team {
  id: number;
  name: string;
  crest: string;
}

interface Match {
  utcDate: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
}

export async function GET(req: NextRequest) {
  const league = req.nextUrl.searchParams.get('league');
  if (!league || !API_KEY) {
    return new Response('Missing league or API_KEY', { status: 400 });
  }

  try {
    const matchesRes = await axios.get<{ matches: Match[] }>(
      `${BASE_URL}/competitions/${league}/matches?status=SCHEDULED`,
      {
        headers: { 'X-Auth-Token': API_KEY },
      }
    );

    const teamsRes = await axios.get<{ teams: Team[] }>(
      `${BASE_URL}/competitions/${league}/teams`,
      {
        headers: { 'X-Auth-Token': API_KEY },
      }
    );

    const teamsMap = new Map<number, { name: string; crest: string }>();
    for (const team of teamsRes.data.teams) {
      teamsMap.set(team.id, {
        name: team.name,
        crest: team.crest,
      });
    }

    const enrichedMatches = matchesRes.data.matches.map((match) => ({
      utcDate: match.utcDate,
      homeTeam: {
        id: match.homeTeam.id,
        name: match.homeTeam.name,
        crest: teamsMap.get(match.homeTeam.id)?.crest || '',
      },
      awayTeam: {
        id: match.awayTeam.id,
        name: match.awayTeam.name,
        crest: teamsMap.get(match.awayTeam.id)?.crest || '',
      },
    }));

    return new Response(JSON.stringify({ matches: enrichedMatches }), {
      status: 200,
    });
  } catch (err) {
    console.error('Match API error:', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch matches' }), {
      status: 500,
    });
  }
}
