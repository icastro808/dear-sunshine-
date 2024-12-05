'use client';

import React, { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row, InputGroup } from 'react-bootstrap';
import { EyeSlash, Eye, PersonFill, LockFill } from 'react-bootstrap-icons';

/** The sign in page. */
const SignIn = () => {
  // state for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // state for error messages
  const [error, setError] = useState<string | null>(null);

  // handle the form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    // retrieve the email and password from the form
    const email = target.email.value;
    const password = target.password.value;

    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // clear any previous error messages
    setError(null);

    const result = await signIn('credentials', {
      redirect: false, // to prevent redirection when submitting form
      email,
      password,
    });

    // handle the result of the sign in
    if (result?.error) {
      setError('Incorrect email or password. Please try again.');
    } else if (result?.ok) {
      window.location.href = '/'; // redirect to the home page
    }
  };

  return (
    <main className="custom-bg">
      <Container className="pb-4 mb-4">
        <Row className="justify-content-center">
          <Col xs={12} sm={8} md={6}>
            <h1
              className="text-center p-4 m-4 pb-2"
              style={{
                fontWeight: 'bold',
                fontSize: '2.5rem',
                color: 'orange',
              }}
            >
              Welcome back, Sunshine
            </h1>
            <Card
              className="pb-4 mb-4"
              style={{
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#fffcf3',
                borderRadius: '15px',
                border: 'none',
              }}
            >
              <Card.Body style={{ paddingBottom: '60px', paddingTop: '20px' }}>
                {error && ( // display error message if there is one
                  <div style={{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>
                    <strong>{error}</strong>
                  </div>
                )}
                <Form method="post" onSubmit={handleSubmit} className="pt-4">
                  <Form.Group controlId="formBasicEmail" className="pb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
                        <PersonFill />
                      </InputGroup.Text>
                      <input
                        name="email"
                        type="text"
                        className="form-control"
                        placeholder="e.g. sunshine@gmail.com"
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
                        <LockFill />
                      </InputGroup.Text>
                      <input
                        name="password"
                        // changes input type based on password toggle state
                        type={passwordVisible ? 'text' : 'password'}
                        className="form-control"
                        placeholder="e.g. password123!"
                      />
                      <Button
                        onClick={() => setPasswordVisible(!passwordVisible)} // toggles password visibility
                        className="position-absolute end-0"
                        variant="link"
                      >
                        {/* changes icon depending on password toggle state */}
                        {passwordVisible ? <Eye className="password-toggle" style={{ color: 'black' }} />
                          : <EyeSlash className="password-toggle" style={{ color: 'black' }} />}
                      </Button>
                    </InputGroup>
                  </Form.Group>
                  <Button
                    type="submit"
                    className="gradient btn-warning w-100 rounded-pill"
                    style={{
                      marginTop: '40px',
                      padding: '12px',
                      fontWeight: 'bold',
                      fontSize: '1.1rem',

                    }}
                  >
                    SIGN IN
                  </Button>
                </Form>
              </Card.Body>
              <Card.Footer className="text-center bg-transparent pt-4">
                Don&apos;t have an account?
                <a href="/auth/signup" style={{ textDecorationLine: 'none', color: 'orange' }}>
                  &nbsp;
                  Sign up now!
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignIn;
