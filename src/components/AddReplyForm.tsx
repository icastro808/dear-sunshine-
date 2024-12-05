/* eslint-disable max-len */

'use client';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addReply } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddReplySchema } from '@/lib/validationSchemas';
import { Letter } from '@prisma/client';
import { Pin } from 'react-bootstrap-icons';

const styles = {
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
};

const onSubmit = async (data: {
  reply: string;
  letterId: number;
  owner: string;
}, reset: () => void) => {
  await addReply(data);
  swal('Success', 'Your response has been added', 'success', {
    timer: 2000,
  });
  reset();
};

// max character count for the reply
const MAX_CHAR_COUNT = 250;

const AddReplyForm = ({ letter }: { letter: Letter }) => {
  // retrieve the current session
  const { data: session, status } = useSession();

  // state to keep track of the character count
  const [charCount, setCharCount] = useState(0);

  // retrieve the current user's email
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(AddReplySchema),
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  // handles the character count as the user types in realtime
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setCharCount(value.length);
  };

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
          <Form.Group>
            <Form.Label>Dear Sunshine,</Form.Label>
            <textarea
              {...register('reply')}
              className={`form-control ${errors.reply ? 'is-invalid' : ''}`}
              placeholder="Write a response to this letter :)"
              style={{
                width: '100%',
                resize: 'vertical',
                minHeight: '100px',
                height: '350px',
              }}
              // sends the value to the handleTextChange function to update the character count
              onChange={(e) => {
                handleTextChange(e);
                register('reply').onChange(e);
              }}
            />
            <div className="invalid-feedback">{errors.reply?.message}</div>
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
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('letterId')} value={letter.id} />
          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <Button type="submit" variant="primary" className="float-end" style={styles.submitBtn}>
                  <Pin className="mr-2" />
                  {' '}
                  Reply to letter
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AddReplyForm;
