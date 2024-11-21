'use client';

import { signOut } from 'next-auth/react';
import { Container, Button, Col, Row, Card } from 'react-bootstrap';
import { PersonXFill } from 'react-bootstrap-icons';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container className="vh-100">
    <Row className="justify-content-center align-items-center h-100">
      <Col xs={10} md={6} lg={4} id="signout-page" className="text-center" style={{ marginTop: '-50px' }}>
        <Card>
          <Card.Body>
            <Card.Text>
              <PersonXFill size="30px" className="me-4" />
              <strong>Are you sure you want to sign out?</strong>
            </Card.Text>

            <Button className="me-3" variant="danger" onClick={() => signOut({ callbackUrl: '/', redirect: true })}>
              Sign Out
            </Button>
            <Button className="ms-3" variant="secondary" href="/">
              Cancel
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignOut;
