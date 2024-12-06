'use client';

import { signOut } from 'next-auth/react';
import { Container, Button, Col, Row, Card } from 'react-bootstrap';

/** After the user clicks the "SignOut" link in the NavBar, log them out and display this page. */
const SignOut = () => (
  <Container fluid className="vh-100 custom-bg">
    <Row className="justify-content-center align-items-center h-100">
      <Col xs={10} md={8} lg={6} id="signout-page" className="text-center" style={{ marginTop: '-50px' }}>
        <Card style={{
          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#fffcf3',
          borderRadius: '15px',
          border: 'none',
          marginLeft: '30px',
          marginRight: '30px',
        }}
        >
          <Card.Title>
            <h1
              className="text-center pt-4"
              style={{
                fontWeight: 'bold',
                fontSize: '2rem',
                color: '#d76b00',
              }}
            >
              Are you sure you want to sign out?
            </h1>
          </Card.Title>
          <Card.Body className="mb-3">
            <Button
              className="gradient btn-lg me-4 rounded-pill"
              variant="warning"
              onClick={() => signOut({ callbackUrl: '/', redirect: true })}
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              Sign Out
            </Button>
            <Button
              className="ms-4 btn-lg rounded-pill"
              variant="danger"
              href="/"
              style={{ fontSize: '1.1rem', fontWeight: 'bold' }}
            >
              Cancel
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignOut;
