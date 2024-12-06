/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Letter, Tag } from '@prisma/client';
import authOptions from '@/lib/authOptions';
import LetterCard from '@/components/LetterCard';
import { prisma } from '@/lib/prisma';

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
          // backgroundColor: '#D4B89A', // Corkboard color
          backgroundColor: '#fff8e6', // Soft beige background
          // border: '10px solid #B58F6C', // Make the border thicker (increase from 5px to 10px)
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Increase the shadow for a stronger effect
          padding: '5%', // Increase padding to make it thicker (you can adjust the percentage)
        }}
      >
        <Container>
          <Row>
            <Col>
              {/* <h2 className="text-center">Letter Board</h2> */}
              {/* Tag filter buttons */}
              <Row className="mb-4">
                <Col xs="auto">
                  <Button
                    variant={selectedTags.length === 0 ? 'primary' : 'outline-primary'}
                    href="?tags="
                    className="no-hover-button"
                    style={{
                      backgroundColor: selectedTags.length === 0 ? '#f4cc70' : '#',
                      color: selectedTags.length === 0 ? '#fff' : '#d76b00',
                      fontWeight: 'bold',
                      borderRadius: '12px',
                      border: '1px solid #d3c5a0',
                      boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                    }}
                  >
                    all
                  </Button>
                </Col>
                {Object.values(Tag).map((tag) => (
                  <Col key={tag} xs="auto">
                    <Button
                      variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                      href={`?tags=${selectedTags.includes(tag) ? selectedTags.filter(t => t !== tag).join(',') : [...selectedTags, tag].join(',')}`}
                      style={{
                        backgroundColor: selectedTags.includes(tag) ? '#f4cc70' : '',
                        color: selectedTags.includes(tag) ? '#fff' : '#d76b00',
                        fontWeight: 'bold',
                        borderRadius: '12px',
                        border: '1px solid #d3c5a0',
                        boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
                      }}
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
              {/* <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Condition</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stuff.map((item) => (
                    <StuffItem key={item.id} {...item} />
                  ))}
                </tbody>
              </Table> */}
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
