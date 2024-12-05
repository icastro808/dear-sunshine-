'use server';

import { Letter, Tag } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { redirect } from 'next/navigation';
import { prisma } from './prisma';

/**
 * Creates a new user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function createUser(credentials: { email: string; password: string }) {
  try {
    // check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    if (existingUser) {
      throw new Error('This email is already registered. Please use a different email or sign in.');
    }

    const password = await hash(credentials.password, 10);
    await prisma.user.create({
      data: {
        email: credentials.email,
        password,
      },
    });

    // the user was successfully created
    return { success: true };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

/**
 * Changes the password of an existing user in the database.
 * @param credentials, an object with the following properties: email, password.
 */
export async function changePassword(credentials: { email: string; oldpassword: string; password: string }) {
  try {
    // check if the email is already registered
    const existingUser = await prisma.user.findUnique({
      where: { email: credentials.email },
    });

    // if the user does not exist
    if (!existingUser) {
      throw new Error('User does not exist.');
    }

    // comparing the old password and new password
    const isPasswordValid = await compare(credentials.oldpassword, existingUser.password);

    // if the old password is incorrect
    if (!isPasswordValid) {
      throw new Error('Old password incorrect.');
    }

    const password = await hash(credentials.password, 10);
    await prisma.user.update({
      where: { email: credentials.email },
      data: {
        password,
      },
    });

    return { success: true };
  } catch (error) {
    return { success: false, message: error instanceof Error ? error.message : 'An unknown error occurred' };
  }
}

export async function addLetter(letter: {
  text: string,
  owner: string;
  tags: string[];
}) {
  await prisma.letter.create({
    data: {
      text: letter.text,
      owner: letter.owner,
      tags: letter.tags as Tag[],
    },
  });
  redirect('/list');
}

export async function editLetter(letter: Letter) {
  await prisma.letter.update({
    where: { id: letter.id },
    data: {
      text: letter.text,
      owner: letter.owner,
      tags: letter.tags as Tag[],
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
