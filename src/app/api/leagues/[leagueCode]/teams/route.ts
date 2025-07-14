import { NextRequest, NextResponse } from 'next/server';

const BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'Missing API_KEY' }, { status: 500 });
  }

  const urlParts = req.nextUrl.pathname.split('/');
  const leagueCode = urlParts[urlParts.length - 2];

  if (!leagueCode) {
    return NextResponse.json({ error: 'Missing leagueCode' }, { status: 400 });
  }

  const response = await fetch(`${BASE_URL}/competitions/${leagueCode}/teams`, {
    headers: {
      'X-Auth-Token': API_KEY,
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
