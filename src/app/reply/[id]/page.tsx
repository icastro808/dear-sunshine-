import { getServerSession } from 'next-auth';
import { Container, Row, Col } from 'react-bootstrap';
import { notFound } from 'next/navigation';
import { Letter } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { prisma } from '@/lib/prisma';
import LetterCard from '@/components/LetterCard';
import AddReplyForm from '@/components/AddReplyForm';

export default async function AddReplyPage({ params }: { params: { id: string | string[] } }) {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  // get the id from the params
  const id = Number(Array.isArray(params?.id) ? params?.id[0] : params?.id);

  // get the letter by id
  const letter: Letter | null = await prisma.letter.findUnique({
    where: { id },
  });
  // if the letter does not exist, return a 404 page
  if (!letter) {
    return notFound();
  }

  // get all replies for the letter
  const replies = await prisma.reply.findMany({});

  return (
    <main>
      <Container fluid className="pb-4" style={{ paddingTop: '50px', backgroundColor: '#fff8e6' }}>
        <Row>
          <Col xs={6} key={letter.id}>
            <LetterCard
              letter={letter}
              replies={replies.filter(reply => reply.letterId === letter.id)}
              showReplyButton={false}
              initialReaction={[]}
            />
          </Col>

          <Col xs={6}>
            <AddReplyForm letter={letter} />
          </Col>
        </Row>
      </Container>
    </main>
  );
}
