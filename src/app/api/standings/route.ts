import { NextRequest } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.API_KEY;
const BASE_URL = 'https://api.football-data.org/v4';

interface TeamInfo {
  name: string;
  crest: string;
}

interface StandingEntry {
  position: number;
  points: number;
  playedGames: number;
  team: TeamInfo;
}

export async function GET(req: NextRequest) {
  const league = req.nextUrl.searchParams.get('league');
  if (!league || !API_KEY) {
    return new Response('Missing league or API_KEY', { status: 400 });
  }

  try {
    const res = await axios.get<{ standings: { table: StandingEntry[] }[] }>(
      `${BASE_URL}/competitions/${league}/standings`,
      {
        headers: { 'X-Auth-Token': API_KEY },
      }
    );

    const rawTable = res.data.standings[0]?.table || [];

    const simplifiedTable = rawTable.map((entry: StandingEntry) => ({
      position: entry.position,
      points: entry.points,
      playedGames: entry.playedGames,
      team: {
        name: entry.team.name,
        crest: entry.team.crest,
      },
    }));

    return new Response(JSON.stringify(simplifiedTable), {
      status: 200,
    });
  } catch (_err) {
    return new Response(
      JSON.stringify({ error: 'Failed to fetch standings' }),
      {
        status: 500,
      }
    );
  }
}
