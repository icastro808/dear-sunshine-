/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Letter, Tag, Reaction } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import LetterCard from '@/components/LetterCard';
import { prisma } from '@/lib/prisma';
import PaginationComponent from '@/components/PaginationComponent';
import styles from './ListPage.module.css'; // Import your CSS module

/** Render a list of stuff for the logged-in user. */
const ListPage = async ({ searchParams }: { searchParams: { tags?: string; page?: string; reactions?: Reaction[] } }) => {
  // max number of letters allowed per page
  const LETTERS_PER_PAGE = 6;

  // get the current page number
  const currentPage = parseInt(searchParams?.page || '1', 10);

  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  // get the selected tags
  const selectedTags = searchParams?.tags ? searchParams.tags.split(',').map(tag => tag as Tag) : [];

  // get the letters based on the selected tags
  const whereClause = selectedTags.length > 0
    ? {
      tags: {
        hasSome: selectedTags,
      },
    }
    : {};

  // get the letters based on the selected tags
  const letters: Letter[] = await prisma.letter.findMany({
    where: whereClause,
    skip: (currentPage - 1) * LETTERS_PER_PAGE,
    take: LETTERS_PER_PAGE,
    // include the reactions and replies for each letter
    include: {
      reaction: true,
      reply: true,
    },
  });

  // get all the reactions and replies
  const reactions = await prisma.reaction.findMany({});
  const replies = await prisma.reply.findMany({});

  // get the total number of letters
  const totalLettersCount = await prisma.letter.count({
    where: whereClause,
  });

  // calculate the total number of pages
  const totalPages = Math.ceil(totalLettersCount / LETTERS_PER_PAGE);

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
                      initialReaction={reactions.filter((reaction) => reaction.letterId === letter.id)}
                    />
                  </Col>
                ))}
              </Row>

              {/* pagination */}
              <Row>
                <Col className="pt-4 d-flex justify-content-center">
                  <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    selectedTags={selectedTags}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
