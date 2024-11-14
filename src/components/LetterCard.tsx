'use client';

import { Letter, Reply } from '@prisma/client';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import ReplyItem from './ReplyItem';
import AddReplyForm from './AddReplyForm';

const LetterCard = ({ letter, replies }: { letter: Letter; replies: Reply[] }) => (
  <Card style={{ borderRadius: '2.5%', padding: '5%' }}>
    <Card.Header>
      <Card.Title>
        {letter.firstName}
          &nbsp;
        {letter.lastName}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text style={{ paddingBottom: '5%', borderBottom: '1px solid #d3d3d3' }}>
        {letter.text}
      </Card.Text>
      <ListGroup variant="flush">
        {replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
      </ListGroup>
      <AddReplyForm letter={letter} />
    </Card.Body>
    <Card.Footer>
      <Link href={`edit/${letter.id}`}>Edit</Link>
    </Card.Footer>
  </Card>
);

export default LetterCard;
