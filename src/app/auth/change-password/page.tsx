'use client';

import { useForm } from 'react-hook-form';
import { useSession } from 'next-auth/react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import swal from 'sweetalert';
import { Card, Col, Container, Button, Form, Row, InputGroup, Alert } from 'react-bootstrap';
import { LockFill, EyeSlash, Eye } from 'react-bootstrap-icons';
import { changePassword } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState } from 'react';

type ChangePasswordForm = {
  oldpassword: string;
  password: string;
  confirmPassword: string;
  // acceptTerms: boolean;
};

/** The change password page. */
const ChangePassword = () => {
  const { data: session, status } = useSession();

  // state for password visibility
  const [passwordVisible, setPasswordVisible] = useState(false);

  // state for error messages
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const email = session?.user?.email || '';
  const validationSchema = Yup.object().shape({
    oldpassword: Yup.string().required('Password is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(40, 'Password must not exceed 40 characters'),
    confirmPassword: Yup.string()
      .required('Confirm Password is required')
      .oneOf([Yup.ref('password'), ''], 'Confirm Password does not match'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data: ChangePasswordForm) => {
    try {
      // reset error message
      setErrorMessage(null);

      // send request to change password
      const response = await changePassword({ email, ...data });

      // if the request was not successful
      if (!response.success) {
        setErrorMessage(response.message ?? 'An unknown error occurred');
        return;
      }

      await swal('Password Changed', 'Your password has been changed', 'success', { timer: 2000 });
      reset();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    }
  };

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  return (
    <main className="custom-bg vh-100">
      { /* displays error message below navbar */}
      {errorMessage && (
        <Alert className="text-center" style={{ color: 'red' }} variant="danger" onClose={() => setErrorMessage(null)}>
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
                color: '#d76b00',
              }}
            >
              Change Password
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
                    <Form.Label>Old Password</Form.Label>
                    <InputGroup>
                      {/* icon */}
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
                        <LockFill />
                      </InputGroup.Text>

                      {/* input field */}
                      <input
                        type="password"
                        {...register('oldpassword')}
                        className={`form-control ${errors.oldpassword ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.oldpassword?.message}</div>
                    </InputGroup>
                  </Form.Group>

                  <Form.Group className="form-group mt-2 pb-3">
                    <Form.Label>New Password</Form.Label>
                    <InputGroup>
                      {/* icon */}
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
                        <LockFill />
                      </InputGroup.Text>

                      {/* input field */}
                      <input
                        type={passwordVisible ? 'text' : 'password'}
                        {...register('password')}
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
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
                      <InputGroup.Text style={{ backgroundColor: 'white' }}>
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
                          Change
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
            </Card>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ChangePassword;
