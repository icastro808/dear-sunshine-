'use client';

import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { useSession } from 'next-auth/react';

const styles = {
  main: {
    backgroundColor: '#fff8e6',
    height: '100%',
  },
  spacer: {
    height: '10px', // Adjust this value to control the amount of space
  },
};

/** The Home page. */
const Home = () => {
  // retrieve the session status
  const { status } = useSession();

  // if the session is still loading, return blank page. this is to prevent the sign-in buttons from flickering
  if (status === 'loading') {
    return null;
  }

  return (
    <main style={styles.main}>
      <Container id="landing-page" fluid className="py-3">
        <Row className="justify-content-center">
          <Col xs={12} className="text-center">
            <Image
              src="/landing-image.png"
              alt="landing-image"
              className="mx-auto d-block"
              fluid
              style={{ width: '50%', paddingLeft: '1%' }}
            />
          </Col>
        </Row>
        {/* Add a new Row for the button group */}
        <Row className="justify-content-center text-center">
          <Col xs={12}>
            {/* Conditionally render buttons based on the signed-in state */}
            {status === 'authenticated' ? null : (
              <div className="button-group">
                <Button
                  variant="primary"
                  href="/auth/signin"
                  className="gradient btn-warning rounded-pill"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: 'white',
                  }}
                >
                  <PersonFill />
                  Sign In
                </Button>
                <Button
                  variant="secondary"
                  href="/auth/signup"
                  className="gradient btn-warning rounded-pill"
                  style={{
                    fontWeight: 'bold',
                    fontSize: '1.1rem',
                    color: 'white',
                  }}
                >
                  <PersonPlusFill />
                  Sign Up
                </Button>
              </div>
            )}
          </Col>
        </Row>

        {/* Spacer Row to add extra space */}
        <Row style={styles.spacer} />
      </Container>
    </main>
  );
};

export default Home;
