'use client';

import { useRouter } from 'next/navigation';
import { deleteReply } from '@/lib/dbActions';
import { Reply } from '@prisma/client';
import { ListGroup, Button } from 'react-bootstrap';

const ReplyItem = ({ reply }: { reply: Reply }) => {
  // used to refresh page after deleting a reply
  const router = useRouter();

  const confirmDelete = async () => {
    try {
      await deleteReply(reply.id);
      swal('Success', 'Reply deleted successfully', 'success');
      router.refresh();
    } catch (error) {
      swal('Error', 'There was an error deleting the reply', 'error');
    }
  };

  return (
    <ListGroup.Item>
      <p className="fw-lighter">{reply.createdAt.toLocaleDateString('en-US')}</p>
      <p>{reply.reply}</p>
      <Button
        className="btn-outline-danger btn-sm"
        style={{ backgroundColor: 'transparent' }}
        onClick={confirmDelete}
      >
        Delete
      </Button>
    </ListGroup.Item>
  );
};

export default ReplyItem;
