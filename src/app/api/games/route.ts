import { NextRequest } from 'next/server';
import axios from 'axios';

const BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  const league = req.nextUrl.searchParams.get('league');

  if (!league) {
    return new Response(JSON.stringify({ error: 'Missing league code' }), {
      status: 400,
    });
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/competitions/${league}/matches`,
      {
        headers: { 'X-Auth-Token': API_KEY },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error: any) {
    console.error('API proxy error:', error?.response?.data || error.message);
    return new Response(JSON.stringify({ error: 'Failed to fetch matches' }), {
      status: 500,
    });
  }
}
