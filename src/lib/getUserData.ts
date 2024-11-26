// getUserData.ts in lib

import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

async function getUserData(userId: string) {
  console.log('Fetching data for user:', userId); // Add this line to debug
  const session = await getServerSession(authOptions);

  const userPosts = await prisma.letter.findMany({
    where: {
      owner: session?.user!.email ? session.user.email : '', // retrieves only user's posts
    },
  });

  const userReplies = await prisma.reply.findMany({
    where: {
      owner: session?.user!.email ? session.user.email : '', // retrieves only user's replies
    },
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
