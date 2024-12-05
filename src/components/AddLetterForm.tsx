/* eslint-disable max-len */

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
import { Pin } from 'react-bootstrap-icons';

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
};

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
const tagOptions: ('vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school')[] = ['vent', 'advice', 'thoughts', 'positivity', 'love', 'family', 'friendship', 'school'];

const AddLetterForm: React.FC = () => {
  // retrieves the current session
  const { data: session, status } = useSession();

  // state to keep track of the selected tags
  const [selectedTags, setSelectedTags] = useState<('vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school')[]>([]);

  // state to keep track of the character count
  const [charCount, setCharCount] = useState(0);

  // retrieves the current user's email
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
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
  const handleTags = (tag: 'vent' | 'advice' | 'thoughts' | 'positivity' | 'love' | 'family' | 'friendship' | 'school') => {
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
    <Container className="py-5" style={styles.container}>
      <Card style={styles.card as React.CSSProperties}>
        <h2 style={styles.title as React.CSSProperties}>Write Letter</h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            {/* <Form.Label style={styles.label}>Text</Form.Label> */}
            <textarea
              {...register('text')}
              placeholder="Write your letter here :)"
              className={`form-control ${errors.text ? 'is-invalid' : ''}`}
              style={styles.textarea as React.CSSProperties}
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
            <br />
            {/* <Form.Label style={styles.label}>What kind of responses would you like?</Form.Label> */}
            <p style={{ fontSize: '1rem', color: '#5e4a3c', marginBottom: '10px' }}>
              Select one or more tags that describe the tone or style of your response and the responses you&apos;d like to
              receive.
            </p>
            <div className="d-flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  onClick={() => handleTags(tag)}
                  style={{
                    ...styles.button,
                    backgroundColor: selectedTags.includes(tag) ? '#f4cc70' : '#FFF',
                    color: selectedTags.includes(tag) ? '#fff' : '#d76b00',
                  }}
                >
                  {tag}
                </Button>
              ))}
            </div>
            <input type="hidden" {...register('tags')} value={selectedTags.join(',')} />
            {errors.tags && (
              <div className="invalid-feedback d-block">{errors.tags?.message}</div>
            )}
          </Form.Group>

          <input type="hidden" {...register('owner')} value={currentUser} />

          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <br />
                <Button type="submit" style={styles.submitBtn}>
                  <Pin className="mr-2" />
                  {' '}
                  Pin to letter board
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
};

export default AddLetterForm;
