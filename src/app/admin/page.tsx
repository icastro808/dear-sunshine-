import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { adminProtectedPage } from '@/lib/page-protection';
import { Letter, Reply } from '@prisma/client';
import LetterCardAdmin from '@/components/LetterCardAdmin';
import authOptions from '@/lib/authOptions';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  adminProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  // const stuff = await prisma.stuff.findMany({});
  // const users = await prisma.user.findMany({});
  const letters: Letter[] = await prisma.letter.findMany({});
  const replies: Reply[] = await prisma.reply.findMany({});
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">Letter Board (Admin)</h2>
              <Row xs={1} md={2} lg={3} className="g-4">
                {letters.map((letter) => (
                  <Col key={letter.firstName + letter.lastName} className="d-flex">
                    <LetterCardAdmin
                      letter={letter}
                      replies={replies.filter(reply => reply.letterId === reply.id)}
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
                    <th>Owner</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {stuff.map((item) => (
                    <StuffItemAdmin key={item.id} {...item} />
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
              <h1>List Users Admin</h1>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                    </tr>
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

export default AdminPage;
