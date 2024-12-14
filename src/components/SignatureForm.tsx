'use client';

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { updateUserSignature } from '@/lib/dbActions';
import swal from 'sweetalert';

const styles = {
  container: {
    // fontFamily: 'Georgia, serif',
    padding: '40px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
  },
  card: {
    backgroundColor: '#FFF', // Parchment color
    border: '1px solid #d3c5a0',
    boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
    padding: '40px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'left',
    borderRadius: '12px', // Remove rounded edges for "paper" look
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#d76b00', // Warm brown color
    textAlign: 'center',
  },
  label: {
    fontSize: '1.1rem',
    fontWeight: '600',
    marginBottom: '10px',
    color: '#d76b00',
  },
  textarea: {
    width: '100%',
    padding: '15px',
    fontSize: '1.1rem',
    border: '1px solid #d3c5a0',
    borderRadius: '0px',
    resize: 'vertical',
    height: '150px',
    marginBottom: '15px',
    backgroundColor: '#FFF',
    color: '#5e4a3c',
  },
  button: {
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '1px solid #d3c5a0',
    padding: '10px 15px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  },
  submitBtn: {
    backgroundColor: '#fff8e6',
    color: '#d76b00',
    borderRadius: '20px',
    fontSize: '1rem',
    fontWeight: 'bold',
    border: '1px solid #d3c5a0',
    padding: '10px 15px',
    boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  },
  resetBtn: {
    backgroundColor: '#f44336',
    color: '#fff',
    border: 'none',
  },
  input: {
    width: '60%',
    margin: '0 auto',
  },
};

interface SignatureFormProps {
  initialSignature: string;
  userEmail: string;
}

const SignatureForm: React.FC<SignatureFormProps> = ({ initialSignature, userEmail }) => {
  const [newSignature, setNewSignature] = useState(initialSignature);

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSignature(e.target.value);
  };

  const handleSignatureSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateUserSignature(userEmail, newSignature);
    swal('Success', 'Your signature has been updated', 'success', {
      timer: 2000,
    });
  };

  return (
    <Form onSubmit={handleSignatureSubmit}>
      <Form.Group controlId="formSignature">
        <Form.Control
          type="text"
          placeholder="Enter new signature"
          value={newSignature}
          onChange={handleSignatureChange}
          style={styles.input}
        />
      </Form.Group>
      <Button
        variant="primary"
        type="submit"
        className="mt-2"
        style={styles.submitBtn}
      >
        Update Signature
      </Button>
    </Form>
  );
};

export default SignatureForm;
