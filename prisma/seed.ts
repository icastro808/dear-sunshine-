// import { PrismaClient, Role, Tag } from '@prisma/client';
// import { hash } from 'bcrypt';
// import * as config from '../config/settings.development.json';

// const prisma = new PrismaClient();

// async function main() {
//   console.log('Seeding the database');
//   const password = await hash('changeme', 10);
//   config.defaultAccounts.forEach(async (account) => {
//     let role: Role = 'USER';
//     if (account.role === 'ADMIN') {
//       role = 'ADMIN';
//     }
//     console.log(`  Creating user: ${account.email} with role: ${role}`);
//     await prisma.user.upsert({
//       where: { email: account.email },
//       update: {},
//       create: {
//         email: account.email,
//         password,
//         role,
//       },
//     });
//     // console.log(`  Created user: ${user.email} with role: ${user.role}`);
//   });
//   config.defaultLetters.forEach(async (letter, index) => {
//     // console.log(`  Adding letter: ${letter.firstName} (${letter.lastName})`);
//     await prisma.letter.upsert({
//       where: { id: index },
//       update: {},
//       create: {
//         text: letter.text,
//         owner: letter.owner,
//         tags: letter.tags as Tag[],
//       },
//     });
//   });
// }

// main()
//   .then(() => prisma.$disconnect())
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient, Role, Tag } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  // Create users using Promise.all to avoid await inside a loop
  const userPromises = config.defaultAccounts.map(async (account) => {
    let role: Role = 'USER';
    if (account.role === 'ADMIN') {
      role = 'ADMIN';
    }
    console.log(`  Creating user: ${account.email} with role: ${role}`);

    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  // Wait for all user creations to complete
  await Promise.all(userPromises);

  // Create letters and replies using Promise.all
  const letterPromises = config.defaultLetters.map(async (letter, index) => {
    const createdLetter = await prisma.letter.upsert({
      where: { id: index },
      update: {},
      create: {
        text: letter.text,
        owner: letter.owner,
        tags: letter.tags as Tag[],
      },
    });

    if (letter.reply && letter.reply.length > 0) {
      const replyPromises = letter.reply.map(async (reply) => {
        console.log(`  Adding reply to letter ${createdLetter.id}`);

        const existingReply = await prisma.reply.findFirst({
          where: {
            letterId: createdLetter.id,
            owner: reply.owner,
          },
        });

        if (!existingReply) {
          await prisma.reply.create({
            data: {
              letterId: createdLetter.id,
              reply: reply.text,
              owner: reply.owner,
            },
          });
        }
      });

      // Wait for all replies for the current letter
      await Promise.all(replyPromises);
    }
  });

  // Wait for all letters to be created
  await Promise.all(letterPromises);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
