import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MentalHealthPage = () => (
  <main
    style={{
      backgroundColor: '#fff8e6', // Light, warm background
      minHeight: '100vh',
      overflowY: 'auto', // Enable scrolling
      padding: '40px 20px',
    }}
  >
    <Container
      style={{
        maxWidth: '900px',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        padding: '30px',
        lineHeight: '1.8',
      }}
    >
      {/* Header Section */}
      <Row>
        <Col className="text-center">
          <h1
            style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#d76b00',
              marginBottom: '10px',
            }}
          >
            Dear Sunshine
          </h1>
          <p
            style={{
              fontSize: '1.2rem',
              color: '#5e4a3c',
              fontStyle: 'italic',
              margin: 0,
            }}
          >
            &quot;Even On Cloudy Days&quot;
          </p>
        </Col>
      </Row>

      {/* Introduction Section */}
      <Row style={{ marginTop: '30px' }}>
        <Col>
          <div
            style={{
              backgroundColor: '#fff3e0',
              borderRadius: '8px',
              padding: '20px',
              color: '#5e4a3c',
              fontSize: '1.1rem',
            }}
          >
            <p>
              Dear Sunshine is here to bring hope and warmth to your life, even when the
              skies seem gray. Life&apos;s challenges are a shared experience, and it&apos;s okay
              to lean on others for support. Let this space be your guide to self-care
              and encouragement.
            </p>
          </div>
        </Col>
      </Row>

      {/* Tips Section */}
      <Row style={{ marginTop: '40px' }}>
        <Col>
          <h3 style={{ color: '#d76b00', fontWeight: '600' }}>Self-Care Tips</h3>
          <ul style={{ paddingLeft: '20px', fontSize: '1.1rem', color: '#5e4a3c' }}>
            <li>Find a daily moment of gratitude to focus on positivity.</li>
            <li>Keep a journal to process your thoughts and emotions.</li>
            <li>Take mindful breaks from social media and technology.</li>
            <li>Engage in hobbies or creative outlets that bring you joy.</li>
            <li>Surround yourself with uplifting and supportive people.</li>
          </ul>
        </Col>
      </Row>

      {/* Resources Section */}
      <Row style={{ marginTop: '40px' }}>
        <Col>
          <h3 style={{ color: '#d76b00', fontWeight: '600' }}>Mental Health Resources</h3>
          <p style={{ color: '#5e4a3c', fontSize: '1.1rem' }}>
            If you or someone you know is struggling, don&apos;t hesitate to reach out to these
            resources:
          </p>
          <ul style={{ paddingLeft: '20px', fontSize: '1.1rem', color: '#5e4a3c' }}>
            <li>National Suicide Prevention Lifeline: 1-800-273-TALK (8255)</li>
            <li>Text HOME to 741741 for confidential support 24/7.</li>
            <li>Local Mental Health Services Directory for personalized help.</li>
            <li>
              Visit
              {' '}
              <a
                href="https://www.mentalhealth.gov"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: '#d76b00',
                  textDecoration: 'underline',
                }}
              >
                MentalHealth.gov
              </a>
              {' '}
              for detailed guidance.
            </li>
          </ul>
        </Col>
      </Row>

      {/* Encouragement Section */}
      <Row style={{ marginTop: '50px' }}>
        <Col>
          <div
            style={{
              backgroundColor: '#ffe8d6',
              borderRadius: '8px',
              padding: '20px',
              textAlign: 'center',
              color: '#5e4a3c',
              fontSize: '1.2rem',
              fontWeight: '500',
            }}
          >
            <p>
              Remember, even on cloudy days, the sun is still shining behind the clouds.
              You are not alone, and brighter days are ahead.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default MentalHealthPage;
