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
  const user = await prisma.user.findUnique({
    where: { email: letter.owner },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.letter.create({
    data: {
      text: letter.text,
      owner: letter.owner,
      tags: letter.tags as Tag[],
      signature: user.signature,
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
  // delete all reactions associated with the letter
  await prisma.reaction.deleteMany({
    where: { letterId: id },
  });

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
  const user = await prisma.user.findUnique({
    where: { email: reply.owner },
  });

  if (!user) {
    throw new Error('User not found');
  }

  await prisma.reply.create({
    data: {
      reply: reply.reply,
      letterId: reply.letterId,
      owner: reply.owner,
      signature: user.signature,
    },
  });

  redirect('/list');
}

export async function deleteReply(replyId: number) {
  await prisma.reply.delete({
    where: { id: replyId },
  });
}

/*
  letterId: the id of the letter to which the reaction is being added to
  userId: the id of the user who is adding the reaction
  type: the type of reaction being added (e.g. 'heart', 'smile')
*/
export async function addReaction(reaction: { letterId: number, userId: number, type: string, owner: string }) {
  await prisma.reaction.create({
    data: {
      owner: reaction.owner,
      letterId: reaction.letterId,
      userId: reaction.userId,
      type: reaction.type,
    },
  });
}

/*
 if you get an error saying "Record to delete does not exist", make sure you log out
 and reset the database. if you don't log out first, the previous session
 will still be active and it won't be able to interact with the database
*/
export async function deleteReaction(reaction: { letterId: number, userId: number, type: string }) {
  await prisma.reaction.delete({
    where: {
      userId_letterId_type: {
        letterId: reaction.letterId,
        userId: reaction.userId,
        type: reaction.type,
      },
    },
  });
}

// get all the letters in the database
export async function getReactions(letterId: number) {
  return prisma.reaction.findMany({
    where: { letterId },
  });
}

export async function updateUserSignature(email: string, signature: string) {
  await prisma.user.update({
    where: { email },
    data: { signature },
  });
}