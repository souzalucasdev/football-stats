import { NextRequest } from 'next/server';
import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.football-data.org/v4';
const API_KEY = process.env.API_KEY;

export async function GET(req: NextRequest) {
  if (!API_KEY) {
    return new Response(JSON.stringify({ error: 'Missing API_KEY' }), {
      status: 500,
    });
  }

  try {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/competitions`,
      {
        headers: {
          'X-Auth-Token': API_KEY,
        },
      }
    );

    const leagues = response.data.competitions
      .filter((comp: any) => comp.code && comp.name && comp.emblem)
      .map((comp: any) => ({
        name: comp.name,
        code: comp.code,
        emblem: comp.emblem,
      }));

    return new Response(JSON.stringify(leagues), {
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
    return new Response(JSON.stringify({ error: 'Failed to fetch leagues' }), {
      status: 500,
    });
  }
}
