// getUserData.ts in lib

import { prisma } from '@/lib/prisma';

async function getUserData(userId: string) {
  console.log('Fetching data for user:', userId); // Add this line to debug

  const userPosts = await prisma.letter.findMany({
    where: { owner: userId }, // Filter posts by the current user's ID
  });

  const userReplies = await prisma.reply.findMany({
    where: { owner: userId }, // Filter replies by the current user's ID
  });

  console.log('Posts:', userPosts); // Log posts data
  console.log('Replies:', userReplies); // Log replies data

  return {
    posts: userPosts,
    replies: userReplies,
    postCount: userPosts.length,
    replyCount: userReplies.length,
  };
}

export default getUserData;
