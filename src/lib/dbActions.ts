'use server';

import { Letter } from '@prisma/client';
import { hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  // console.log(`createUser data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.create({
    data: {
      email: credentials.email,
      password,
    },
  });
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; password: string }) {
  // console.log(`changePassword data: ${JSON.stringify(credentials, null, 2)}`);
  const password = await hash(credentials.password, 10);
  await prisma.user.update({
    where: { email: credentials.email },
    data: {
      password,
    },
  });
}

export async function addLetter(letter: {
  firstName: string;
  lastName: string;
  text: string,
  owner: string; }) {
  await prisma.letter.create({
    data: {
      firstName: letter.firstName,
      lastName: letter.lastName,
      text: letter.text,
      owner: letter.owner,
    },
  });
  redirect('/list');
}

export async function editLetter(letter: Letter) {
  await prisma.letter.update({
    where: { id: letter.id },
    data: {
      firstName: letter.firstName,
      lastName: letter.lastName,
      text: letter.text,
      owner: letter.owner,
    },
  });
  redirect('/list');
}

export async function deleteLetter(id: number, admin: boolean = false) {
  await prisma.letter.delete({
    where: { id },
  });

  if (admin) {
    redirect('/admin');
  } else {
    redirect('/list');
  }
}

export async function addReply(reply: { reply: string; letterId: number, owner: string }) {
  await prisma.reply.create({
    data: {
      reply: reply.reply,
      letterId: reply.letterId,
      owner: reply.owner,
    },
  });
  redirect('/list');
}

export async function deleteReply(replyId: number) {
  await prisma.reply.delete({
    where: { id: replyId },
  });
}
