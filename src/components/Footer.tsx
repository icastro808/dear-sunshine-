import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer
    style={{
      background: 'linear-gradient(90deg, #FFF8DC, #FAFAD2)', // Soft yellow gradient
      boxShadow: '0 -4px 10px rgba(0, 0, 0, 0.1)', // Gentle shadow on top
      borderTop: '2px solid #FFD700', // Soft gold top border
      color: '#F9A602', // Darker text for contrast
    }}
    className="mt-auto py-4"
  >
    <Container>
      <Col className="text-center">
        <h5 style={{ fontWeight: 'bold', marginBottom: '10px', fontSize: '1.5rem' }}>
          Stay Bright, Stay Inspired
        </h5>
        {/* <p style={{ margin: 0, fontSize: '1.1rem' }}>
          Department of Information and Computer Sciences
        </p>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>University of Hawaii</p>
        <p style={{ margin: 0, fontSize: '1.1rem' }}>Honolulu, HI 96822</p> */}
        <small
          style={{
            fontSize: '0.9rem',
            opacity: 0.8,
            display: 'block',
            marginTop: '10px',
          }}
        >
          Feeling Down?
          <br />
          <a
            href="/health"
            style={{
              color: '#F9A602',
              fontWeight: 'bold',
              textDecoration: 'none', // Ensures no underline
            }}
          >
            Visit the Mental Health Page
          </a>
          <br />
          ©
          {new Date().getFullYear()}
        </small>

      </Col>
    </Container>
  </footer>
);

export default Footer;
