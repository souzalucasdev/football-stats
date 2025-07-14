import { NextResponse } from 'next/server';

const BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.API_KEY;

export async function GET(req: Request, { params }: { params: { leagueCode: string } }) {
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API_KEY' }), {
      status: 500,
    });
  }
  const { leagueCode } = params;

  const response = await fetch(`${BASE_URL}/competitions/${leagueCode}/teams`, {
    headers: {
      'X-Auth-Token': process.env.API_KEY!,
    },
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: response.status });
  }

  const data = await response.json();

  const teams = data.teams.map((team: any) => ({
    id: team.id,
    name: team.name,
  }));

  return NextResponse.json(teams);
}
