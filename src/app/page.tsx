/* eslint-disable max-len */

'use client';

import { Col, Container, Row, Image, Button } from 'react-bootstrap';
import { PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={8} className="d-flex justify-content-end">
          <div
            className="box"
            style={{
              backgroundColor: '',
              height: '300px',
              width: 'calc(300px * 1.3)', // Adjust width with aspect ratio of 1.3
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'flex-end', // Align all content to the right
            }}
          >
            <Row className="w-100">
              <Col style={{ backgroundColor: '', height: '100px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <h1>Dear Sunshine</h1>
              </Col>
              <Col style={{ backgroundColor: '', height: '100px', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Image
                  src="/stamp.png"
                  alt="Sunshine Stamp"
                  className="sun-image"
                  style={{ width: '100px', height: 'auto' }}
                />
              </Col>
            </Row>
            <p>A platform designed to uplift and encourage individuals who may be going through tough times.</p>
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
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
