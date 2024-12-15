/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET handler
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const letterId = params.id;

  // check if the letter id is valid
  if (!letterId || Number.isNaN(Number(letterId))) {
    return NextResponse.json({ error: 'Invalid letter ID' }, { status: 400 });
  }

  try {
    const reactions = await prisma.reaction.findMany({
      // find all reactions for the given letter id
      where: {
        letterId: Number(letterId),
      },
    });

    // return the reactions as a JSON response
    return NextResponse.json(reactions, { status: 200 });
  } catch (error) {
    console.error('Error fetching reactions:', error);
    return NextResponse.json({ error: 'An error occurred while fetching reactions' }, { status: 500 });
  }
}
