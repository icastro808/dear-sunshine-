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
  /* const owner = (session && session.user && session.user.email) || '';
  const stuff = await prisma.stuff.findMany({
    where: {
      owner,
    },
  }); */
  // console.log(stuff);
  /* const contacts: Contact[] = [
    {
      firstName: 'Philip',
      lastName: 'Johnson',
      address: 'POST 307, University of Hawaii',
      image: 'https://github.com/philipmjohnson.png',
      description: 'I am a Professor of Information and Computer Sciences at the University of Hawaii, Director '
      + 'of the Collaborative Software Development Laboratory, and the CEO of OpenPowerQuality.com.',
    },
    {
      firstName: 'Henri',
      lastName: 'Casanova',
      address: 'POST 307, University of Hawaii',
      image: 'https://avatars0.githubusercontent.com/u/7494478?s=460&v=4',
      description: 'I am originally from France. I maintain a list of reports from my surf sessions. I have proof '
      + 'that I ran the Hana relay with an actual Team.',
    },
    {
      firstName: 'Kim',
      lastName: 'Binsted',
      address: 'POST 307, University of Hawaii',
      image: 'https://www.ics.hawaii.edu/wp-content/uploads/2013/08/kim_binsted-square-300x300.jpg',
      description: 'Kim Binsted received her BSc in Physics at McGill (1991), and her PhD in Artificial Intelligence'
      + 'from the University of Edinburgh (1996). Her thesis topic was the computational modeling and generation of '
      + 'punning riddles, and her program, JAPE (Joke Analysis and Production Engine), generated puns such as '
      + '"What do you call a Martian who drinks beer? An ale-ien!".',
    },
  ]; */
  const letters: Letter[] = await prisma.letter.findMany({
    where: {
      owner: session?.user!.email ? session.user.email : '',
    },
  });
  const replies = await prisma.reply.findMany({
    where: {
      owner: session?.user!.email ? session.user.email : '',
    },
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
