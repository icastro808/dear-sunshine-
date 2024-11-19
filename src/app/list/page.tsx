import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Letter } from '@prisma/client';
import LetterCard from '@/components/LetterCard';
import { prisma } from '@/lib/prisma';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const letters: Letter[] = await prisma.letter.findMany({
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
          backgroundColor: '#D4B89A', // Corkboard color
          padding: '5%', // Increase padding to make it thicker (you can adjust the percentage)
          border: '10px solid #B58F6C', // Make the border thicker (increase from 5px to 10px)
          boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.2)', // Increase the shadow for a stronger effect
        }}
      >
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Letter Board</h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {letters.map((letter) => (
                  <Col key={letter.firstName + letter.lastName} className="d-flex">
                    <LetterCard
                      letter={letter}
                      replies={replies.filter(reply => reply.letterId === letter.id)}
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
