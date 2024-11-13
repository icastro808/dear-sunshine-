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

const onSubmit = async (data: {
  reply: string;
  letterId: number;
  owner: string; }) => {
  await addReply(data);
  swal('Success', 'Your response has been added', 'success', {
    timer: 2000,
  });
};

const AddReplyForm = ({ letter } : { letter: Letter }) => {
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
      <Card.Header style={{ textAlign: 'center' }}>Add Timestamped Reponse</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group>
            <Form.Label>Response</Form.Label>
            <input
              type="text"
              {...register('reply')}
              className={`form-control ${errors.reply ? 'is-invalid' : ''}`}
            />
            <div className="invalid-feedback">{errors.reply?.message}</div>
          </Form.Group>
          <input type="hidden" {...register('owner')} value={currentUser} />
          <input type="hidden" {...register('letterId')} value={letter.id} />
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
  );
};

export default AddReplyForm;
