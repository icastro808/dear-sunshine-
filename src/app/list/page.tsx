/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Letter, Tag } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import LetterCard from '@/components/LetterCard';
import { prisma } from '@/lib/prisma';
import styles from './ListPage.module.css'; // Import your CSS module

/** Render a list of stuff for the logged-in user. */
const ListPage = async ({ searchParams }: { searchParams: { tags?: string } }) => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  const selectedTags = searchParams?.tags ? searchParams.tags.split(',').map(tag => tag as Tag) : [];

  const whereClause = selectedTags.length > 0
    ? {
      tags: {
        hasSome: selectedTags,
      },
    }
    : {};

  const letters: Letter[] = await prisma.letter.findMany({
    where: whereClause,
    /*
    uncomment this to show letters only belonging to the owner

    where: {
      owner: session?.user!.email ? session.user.email : '',
    },
    */
  });

  const replies = await prisma.reply.findMany({
    /*
    uncomment this to show replies only belonging to the owner

    where: {
      owner: session?.user!.email ? session.user.email : '',
    },
    */
  });

  return (
    <main>
      <Container
        id="list"
        fluid
        className="py-3"
        style={{
          backgroundColor: '#fff8e6',
          padding: '5%',
        }}
      >
        <Container>
          <Row>
            <Col>
              {/* Tag filter buttons */}
              <Row className="mb-4">
                <Col xs="auto">
                  <Button
                    variant={selectedTags.length === 0 ? 'primary' : 'outline-primary'}
                    href="?tags="
                    className={`${styles.buttonTag} ${selectedTags.length === 0 ? styles.buttonTagSelected : styles.buttonTagUnselected}`}
                  >
                    all
                  </Button>
                </Col>
                {Object.values(Tag).map((tag) => (
                  <Col key={tag} xs="auto">
                    <Button
                      variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                      href={`?tags=${selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag).join(',') : [...selectedTags, tag].join(',')}`}
                      className={`${styles.buttonTag} ${selectedTags.includes(tag) ? styles.buttonTagSelected : styles.buttonTagUnselected}`}
                    >
                      {tag}
                    </Button>
                  </Col>
                ))}
              </Row>
              {/* Display letters based on the selected tag */}
              <Row xs={1} md={2} lg={3} className="g-4">
                {letters.map((letter) => (
                  <Col key={letter.id} className="d-flex">
                    <LetterCard
                      letter={letter}
                      replies={replies.filter(reply => reply.letterId === letter.id)}
                      showReplyButton
                    />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
