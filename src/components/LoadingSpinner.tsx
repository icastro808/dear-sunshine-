import { Spinner } from 'react-bootstrap';

const LoadingSpinner = () => (
  <div className="loading-overlay">
    <Spinner animation="border" variant="light" />
  </div>
);

export default LoadingSpinner;
