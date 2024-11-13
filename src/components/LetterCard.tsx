'use client';

import { Letter, Reply } from '@prisma/client';
import Link from 'next/link';
import { Card, ListGroup } from 'react-bootstrap';
import ReplyItem from './ReplyItem';
import AddReplyForm from './AddReplyForm';

const LetterCard = ({ letter, replies }: { letter: Letter; replies: Reply[] }) => (
  <Card style={{ backgroundColor: '#fcf4e2', width: '100%' }}>
    <Card.Header>
      <Card.Title>
        {letter.firstName}
          &nbsp;
        {letter.lastName}
      </Card.Title>
    </Card.Header>
    <Card.Body>
      <Card.Text>
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
