import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { Letter } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import EditLetterForm from '@/components/EditLetterForm';

export default async function EditLetterPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);
  const letter: Letter | null = await prisma.letter.findUnique({
    where: { id },
  });
  if (!letter) {
    return notFound();
  }

  return (
    <main>
      <EditLetterForm letter={letter} />
    </main>
  );
}
