'use client';

import { Letter, Reply } from '@prisma/client';
import { Card, ListGroup } from 'react-bootstrap';
import ReplyItem from './ReplyItem';

const LetterCardAdmin = ({ letter, replies }: { letter: Letter; replies: Reply[] }) => (
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
      <p className="blockquote-footer text-break" style={{ position: 'relative', zIndex: 1 }}>
        {letter.owner}
      </p>
    </Card.Body>
  </Card>
);

export default LetterCardAdmin;
