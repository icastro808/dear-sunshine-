/* eslint-disable max-len */

'use client';

import { useSession } from 'next-auth/react';
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

const AddReplyForm = ({ letter }: { letter: Letter }) => {
  const { data: session, status } = useSession();
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

  return (
    <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit((data) => onSubmit(data, reset))}>
          <Form.Group>
            {/* <Form.Label>Post a Reply</Form.Label> */}
            <textarea
              {...register('reply')}
              className={`form-control ${errors.reply ? 'is-invalid' : ''}`}
              placeholder="Leave a note for this letter :)"
              style={{
                width: '100%',
                resize: 'vertical',
                minHeight: '100px',
              }}
            />
            <div className="invalid-feedback">{errors.reply?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('letterId')} value={letter.id} />
          <Form.Group className="form-group">
            <Row className="pt-3">
              <Col>
                <Button type="submit" variant="primary" className="float-end" style={{ backgroundColor: '#f8d7da', borderColor: '#f5c6cb' }}>
                  <Pin className="mr-2" />
                  {' '}
                  Pin to board
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
