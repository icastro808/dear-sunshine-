'use client';

import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { useState, useEffect } from 'react';

/** The Home page. */
const Home = () => {
  // Simulate checking if the user is signed in
  const [isSignedIn, setIsSignedIn] = useState(false);

  // For demonstration, simulate sign-in status change after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSignedIn(true); // Change to true after 2 seconds (for testing purposes)
    }, 2000);

    return () => clearTimeout(timer); // Clean up the timer on unmount
  }, []);

  return (
    <main>
      <Container id="landing-page" fluid className="py-3">
        <Row className="align-middle text-center">
          <Col xs={8} className="d-flex justify-content-end">
            <div
              className="box"
              style={{
                backgroundColor: '#F9A602',
                height: '300px',
                width: 'calc(300px * 1.3)', // Adjust width with aspect ratio of 1.3
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end', // Align all content to the right
              }}
            >
              <Row className="w-100">
                <Col
                  style={{
                    backgroundColor: '',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <h1>Dear Sunshine</h1>
                </Col>
                <Col
                  style={{
                    backgroundColor: '',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src="/stamp.png"
                    alt="Sunshine Stamp"
                    className="sun-image"
                    style={{ width: '100px', height: 'auto' }}
                  />
                </Col>
              </Row>
              <p>A platform designed to uplift and encourage individuals who may be going through tough times.</p>

              {/* Conditionally render buttons based on the signed-in state */}
              {!isSignedIn && (
                <div className="button-group">
                  <Button variant="primary" href="/auth/signin" className="me-2">
                    <PersonFill />
                    Sign In
                  </Button>
                  <Button variant="secondary" href="/auth/signup">
                    <PersonPlusFill />
                    Sign Up
                  </Button>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
