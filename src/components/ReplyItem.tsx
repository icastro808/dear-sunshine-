'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { deleteReply, getLetterById } from '@/lib/dbActions';
import { Reply } from '@prisma/client';
import { ListGroup, Dropdown, Row, Col } from 'react-bootstrap';
import { ThreeDots } from 'react-bootstrap-icons';
import swal from 'sweetalert';

const ReplyItem = ({ reply }: { reply: Reply }) => {
  // used to refresh page after deleting a reply
  const pathname = usePathname();

  // retrieves session data
  const { data: session } = useSession();

  // state to store the letter signature
  const [letterSignature, setLetterSignature] = useState<string | null>(null);

  useEffect(() => {
    const fetchLetterSignature = async () => {
      try {
        const letter = await getLetterById(reply.letterId);
        setLetterSignature(letter.signature);
      } catch (error) {
        console.error('Error fetching letter signature:', error);
      }
    };

    fetchLetterSignature();
  }, [reply.letterId]);

  const confirmDelete = async () => {
    try {
      await deleteReply(reply.id);
      swal('Success', 'Reply deleted successfully', 'success');

      // timer for the success message to show before refreshing the page
      setTimeout(() => {
        // go back to the previous page if the current page is a reply page
        if (pathname.includes('page')) {
          window.history.back();
        } else {
          // reload the page
          window.location.reload();
        }
      }, 1500);
    } catch (error) {
      swal('Error', 'There was an error deleting the reply', 'error');
    }
  };

  return (
    <ListGroup.Item>
      <Row>
        <Col>
          <p className="fw-lighter">{reply.createdAt.toLocaleDateString('en-US')}</p>
        </Col>

        <Col>
          { (session?.user?.email === reply.owner || (session?.user as any)?.randomKey === 'ADMIN') && (
            // only shows delete button if the current user is the owner of the reply or admin.
            <Dropdown>
              <Dropdown.Toggle
                variant="transparent"
                style={{ marginLeft: '140px', marginTop: '-5px', color: 'darkgray' }}
              >
                <ThreeDots />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={confirmDelete}>Delete</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Col>
      </Row>

      <Row>
        Dear {letterSignature},
        <p>{reply.reply}</p>
        From,
        <br />
        {reply.signature}
      </Row>
    </ListGroup.Item>
  );
};

export default ReplyItem;
