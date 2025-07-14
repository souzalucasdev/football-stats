import { NextRequest } from 'next/server';
import axios from 'axios';

const API_TOKEN = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const name = req.nextUrl.searchParams.get('name');
  const league = req.nextUrl.searchParams.get('league');

  if (!name || !league || !API_TOKEN) {
    return new Response('Missing name or league or token', { status: 400 });
  }

  try {
    const teamsRes = await axios.get(
      `https://api.football-data.org/v4/competitions/${league}/teams`,
      {
        headers: { 'X-Auth-Token': API_TOKEN },
      },
    );

    const match = teamsRes.data.teams.find(
      (team: any) =>
        team.name.toLowerCase() === name.toLowerCase() ||
        team.shortName?.toLowerCase() === name.toLowerCase(),
    );

    if (!match) {
      return new Response(JSON.stringify({ crest: null }), { status: 404 });
    }

    return new Response(JSON.stringify({ crest: match.crest }), { status: 200 });
  } catch (err) {
    console.error('Team crest fetch failed:', err);
    return new Response('Error fetching crest', { status: 500 });
  }
}
