import { NextRequest } from 'next/server';
import axios, { AxiosResponse } from 'axios';

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
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/competitions/${league}/matches`,
      {
        headers: { 'X-Auth-Token': API_KEY },
      }
    );

    return new Response(JSON.stringify(response.data), {
      status: 200,
    });
  } catch (error: unknown) {
    let errorMessage = 'Unknown error';

    if (axios.isAxiosError(error)) {
      errorMessage = JSON.stringify(error.response?.data || error.message);
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }

    console.error('API proxy error:', errorMessage);
    return new Response(JSON.stringify({ error: 'Failed to fetch matches' }), {
      status: 500,
    });
  }
}
