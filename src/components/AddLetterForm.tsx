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
  text: string;
  owner: string;
  tags: string[];
}) => {
  await addLetter(data);
  swal('Success', 'Your letter has been added', 'success', {
    timer: 2000,
  });
};

// max character count for a letter
const MAX_CHAR_COUNT = 500;

// options for the tags -- can be expanded upon
const tagOptions: ('happy' | 'neutral' | 'sad' | 'angry')[] = ['happy', 'neutral', 'sad', 'angry'];

const AddLetterForm: React.FC = () => {
  // retrieves the current session
  const { data: session, status } = useSession();

  // state to keep track of the selected tags
  const [selectedTags, setSelectedTags] = useState<('happy' | 'neutral' | 'sad' | 'angry')[]>([]);

  // state to keep track of the character count
  const [charCount, setCharCount] = useState(0);

  // retrieves the current user's email
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    // reset,
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

  // handles the tags as the user selects them
  const handleTags = (tag: 'happy' | 'neutral' | 'sad' | 'angry') => {
    // if the tag is already selected, remove it; otherwise, add it to the list
    const updatedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    // update the state and the form value
    setSelectedTags(updatedTags);
    setValue('tags', updatedTags);
  };

  // handles the character count as the user types in realtime
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCharCount(value.length);
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center ">
        <Col xs={10}>
          <Col className="text-center">
            <h2>What&apos;s on your mind?</h2>
          </Col>
          <Card style={{ border: 'none' }}>
            <Card.Body style={{
              margin: '0 auto',
              width: '80%',
              height: '70vh',
              backgroundColor: '#f8f9fa',
            }}
            >
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group>
                  <Form.Label>Text here...</Form.Label>
                  <textarea
                    {...register('text')}
                    className={`form-control ${errors.text ? 'is-invalid' : ''}`}
                    rows={12}
                    // sends the value to the handleTextChange function to update the character count
                    onChange={(e) => {
                      handleTextChange(e);
                      register('text').onChange(e);
                    }}
                  />
                  <div className="invalid-feedback">{errors.text?.message}</div>
                  {/* displays the character count */}
                  <small
                    className={charCount > MAX_CHAR_COUNT ? 'text-danger' : 'text-muted'}
                  >
                    {charCount}
                    /
                    {MAX_CHAR_COUNT}
                    &nbsp;characters
                  </small>
                </Form.Group>
                <Form.Group>
                  <div style={{ fontSize: '150%', textAlign: 'right', padding: '2%' }}>
                    From Sunshine,
                  </div>
                  <br />
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
                        Post
                      </Button>
                    </Col>
                    {/* <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
                        Reset
                      </Button>
                    </Col> */}
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
