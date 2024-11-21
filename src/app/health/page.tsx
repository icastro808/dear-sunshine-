import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MentalHealthPage = () => (
  <main
    style={{
      backgroundColor: 'darkred',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Container
      fluid
      style={{
        maxWidth: '800px',
        backgroundColor: 'beige',
        borderRadius: '8px',
        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
        padding: '20px',
      }}
    >
      {/* Title Section */}
      <Row className="text-center">
        <Col>
          <h1
            style={{
              fontSize: '2rem',
              color: '#842029',
              marginBottom: '0',
            }}
          >
            "Dear Sunshine, Even On Cloudy Days"
          </h1>
        </Col>
      </Row>

      {/* Introduction Section */}
      <Row className="text-center" style={{ marginTop: '20px' }}>
        <Col>
          <div
            style={{
              backgroundColor: '#FFEFEF',
              color: '#5A1D1D',
              fontSize: '1.2rem',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #5A1D1D',
            }}
          >
            <p>
              Dear Sunshine is created to be a beacon of hope and comfort. We
              know that life can be tough, and it's okay to seek help. This
              platform is here to uplift you, even when the light seems dim.
            </p>
          </div>
        </Col>
      </Row>

      {/* Tips Section */}
      <Row
        className="tips-section"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          marginTop: '40px',
        }}
      >
        <Col
          xs={6}
          style={{
            backgroundColor: '#F8D7DA',
            borderRadius: '8px 0 0 8px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ margin: 0 }}>Tips</h3>
        </Col>
        <Col
          xs={6}
          style={{
            backgroundColor: '#FFF3F4',
            borderRadius: '0 8px 8px 0',
            padding: '20px',
            borderLeft: '1px solid #5A1D1D',
            color: '#6A1E1E',
            fontSize: '1rem',
          }}
        >
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li>Take breaks when feeling overwhelmed.</li>
            <li>Practice mindfulness or meditation.</li>
            <li>Talk to someone you trust about your feelings.</li>
            <li>Maintain a regular sleep schedule.</li>
            <li>Engage in physical activities you enjoy.</li>
          </ul>
        </Col>
      </Row>

      {/* Resources Section */}
      <Row style={{ marginTop: '40px' }}>
        <Col>
          <div
            style={{
              backgroundColor: '#FBE9E7',
              color: '#5C1B1B',
              fontSize: '1.1rem',
              padding: '20px',
              borderRadius: '8px',
              border: '1px solid #5A1D1D',
            }}
          >
            <h4>Mental Health Resources</h4>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>National Suicide Prevention Lifeline: 1-800-273-TALK (8255)</li>
              <li>Text HOME to 741741 for free support.</li>
              <li>Local Mental Health Services Directory</li>
              <li>
                Visit{' '}
                <a
                  href="https://www.mentalhealth.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#842029', textDecoration: 'underline' }}
                >
                  MentalHealth.gov
                </a>{' '}
                for more information.
              </li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  </main>
);

export default MentalHealthPage;
