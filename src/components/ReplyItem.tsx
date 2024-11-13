'use client';

import { Reply } from '@prisma/client';
import { ListGroup } from 'react-bootstrap';

const ReplyItem = ({ reply }: { reply: Reply }) => (
  <ListGroup.Item style={{ backgroundColor: '#fcf4e2' }}>
    <p className="fw-lighter">{reply.createdAt.toLocaleDateString('en-US')}</p>
    <p>{reply.reply}</p>
  </ListGroup.Item>
);

export default ReplyItem;
