'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addLetter } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddLetterSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  firstName: string;
  lastName: string;
  text: string;
  owner: string;
  tags: string[];
}) => {
  await addLetter(data);
  swal('Success', 'Your letter has been added', 'success', {
    timer: 2000,
  });
};

const tagOptions: ('happy' | 'neutral' | 'sad' | 'angry')[] = ['happy', 'neutral', 'sad', 'angry'];

const AddLetterForm: React.FC = () => {
  const { data: session, status } = useSession();
  const [selectedTags, setSelectedTags] = useState<('happy' | 'neutral' | 'sad' | 'angry')[]>([]);
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddLetterSchema),
  });
  if (status === 'loading') {
    return <LoadingSpinner />;
  }
  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  const handleTags = (tag: 'happy' | 'neutral' | 'sad' | 'angry') => {
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(updatedTags);
    setValue('tags', updatedTags);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Contact</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <input
                        type="text"
                        {...register('firstName')}
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.firstName?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <input
                        type="text"
                        {...register('lastName')}
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.lastName?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Text</Form.Label>
                  <textarea
                    {...register('text')}
                    className={`form-control ${errors.text ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.text?.message}</div>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Tags</Form.Label>
                  <div className="d-flex flex-wrap gap-2">
                    {tagOptions.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant={selectedTags.includes(tag) ? 'primary' : 'outline-primary'}
                        onClick={() => handleTags(tag)}
                        className="me-2 mb-2"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                  <input
                    type="hidden"
                    {...register('tags')}
                    value={selectedTags.join(',')}
                  />
                  {errors.tags && <div className="invalid-feedback d-block">{errors.tags?.message}</div>}
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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
  );
};

export default AddLetterForm;
