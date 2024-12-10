'use client';

import { signIn, useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Card, Col, Container, Button, Form, Row, InputGroup, Alert } from 'react-bootstrap';
import { PersonFill, LockFill, Eye, EyeSlash } from 'react-bootstrap-icons';
import { createUser } from '@/lib/dbActions';
import { useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

type SignUpForm = {
  email: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The sign up page. */
const SignUp = () => {
  // state for password
  const [passwordVisible, setPasswordVisible] = useState(false);

  // state for error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // get the session status
  const { status } = useSession();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Email is invalid'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Passwords do not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SignUpForm>({
    resolver: yupResolver(validationSchema),
  });

  // show loading spinner while loading
  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  const onSubmit = async (data: SignUpForm) => {
    try {
      // create a new user
      const response = await createUser(data);

      // if response is not successful, set error
      if (!response.success) {
        setErrorMessage(response.message ?? 'An unknown error occurred');
        return;
      }

      // After creating, signIn with redirect to the add page
      await signIn('credentials', { callbackUrl: '/', ...data });
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  return (
    <main className="custom-bg">
      { /* displays error message below navbar */}
      {errorMessage && (
        <Alert className="text-center" style={{ color: 'red' }} variant="danger">
          {errorMessage}
        </Alert>
      )}
      <Container className="pb-4 mb-4">
        <Row className="justify-content-center">
          <Col xs={5}>
            <h1
              className="text-center p-4 m-4 pb-2"
              style={{
                fontWeight: 'bold',
                fontSize: '2.5rem',
                color: 'orange',
              }}
            >
              Welcome, Sunshine
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
              <Card.Body>
                <Form onSubmit={handleSubmit(onSubmit)} className="pt-3">
                  <Form.Group className="form-group pb-3">
                    <Form.Label>Email</Form.Label>
                    <InputGroup>
                      {/* icon */}
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
                        <PersonFill />
                      </InputGroup.Text>

                      {/* input field */}
                      <input
                        type="text"
                        {...register('email')}
                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                        placeholder="e.g. sunshine@gmail.com"
                      />
                      <div className="invalid-feedback">{errors.email?.message}</div>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="form-group mt-2 pb-3">
                    <Form.Label>Password</Form.Label>
                    <InputGroup>
                      {/* icon */}
                      <InputGroup.Text>
                        <LockFill />
                      </InputGroup.Text>

                      {/* input field */}
                      <input
                        // changes input type based on password toggle state
                        type={passwordVisible ? 'text' : 'password'}
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        placeholder="e.g. password123!"
                      />
                      <Button
                        onClick={() => setPasswordVisible(!passwordVisible)} // toggles password visibility
                        className="position-absolute end-0"
                        variant="link"
                      >
                        {/* changes icon depending on password toggle state */}
                        {passwordVisible ? <Eye className="link-toggle" style={{ color: 'black' }} />
                          : <EyeSlash className="link-toggle" style={{ color: 'black' }} />}
                      </Button>
                      <div className="invalid-feedback">{errors.password?.message}</div>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="form-group mt-2 pb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <InputGroup>
                      {/* icon */}
                      <InputGroup.Text>
                        <LockFill />
                      </InputGroup.Text>
                      {/* input field */}
                      <input
                        type="password"
                        {...register('confirmPassword')}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </InputGroup>
                  </Form.Group>

                  {/* buttons */}
                  <Form.Group className="form-group py-3">
                    <Row>
                      <Col className="ms-2">
                        <Button
                          type="submit"
                          variant="warning"
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            padding: '12px',
                          }}
                          className="gradient btn btn-primary rounded-pill"
                        >
                          Register
                        </Button>
                      </Col>
                      <Col className="d-flex justify-content-end me-2">
                        <Button
                          type="button"
                          variant="danger"
                          onClick={() => reset()}
                          className="btn-warning rounded-pill"
                          style={{
                            fontSize: '1.1rem',
                            fontWeight: 'bold',
                            padding: '12px',
                          }}
                        >
                          Reset
                        </Button>
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Card.Body>

              <Card.Footer className="text-center bg-transparent pt-4">
                Already have an account?
                <a href="/auth/signin" style={{ textDecorationLine: 'none', color: 'orange' }}>
                  &nbsp;
                  Sign in
                </a>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default SignUp;
