import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const { name, email, password, favoriteLeague, favoriteTeam } = await req.json();

    if (!name || !email || !password || !favoriteLeague || !favoriteTeam) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const league = await prisma.league.upsert({
      where: { code: favoriteLeague },
      update: {},
      create: {
        name: favoriteLeague,
        code: favoriteLeague,
      },
    });

    let team = await prisma.team.findFirst({ where: { name: favoriteTeam } });
    if (!team) {
      team = await prisma.team.create({
        data: {
          name: favoriteTeam,
          crest: '',
        },
      });
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        favoriteLeagueId: league.id,
        favoriteTeamId: team.id,
      },
    });

    return NextResponse.json(
      {
        message: 'User created',
        user: {
          id: user.id,
          email: user.email,
          favoriteLeague: league,
          favoriteTeam: team,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
