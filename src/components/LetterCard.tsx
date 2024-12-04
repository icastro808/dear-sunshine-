'use client';

import { Letter, Reply } from '@prisma/client';
import Link from 'next/link';
import { Card, ListGroup, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { deleteLetter } from '@/lib/dbActions';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ReplyItem from './ReplyItem';

const LetterCard = ({
  letter, replies, showReplyButton = true }: { letter: Letter; replies: Reply[]; showReplyButton: boolean }) => {
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // retrieves the current session
  const { data: session } = useSession();

  // makes the modal (confirming deletion popup) visible
  const handleShowModal = () => setShowModal(true);
  // hides the modal
  const handleCloseModal = () => setShowModal(false);

  const confirmDelete = async () => {
    try {
      await deleteLetter(letter.id);
      swal('Success', 'The letter was deleted successfully', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('An error occurred while deleting the letter', error);
      handleCloseModal();
    }
  };

  return (
    <Card style={{ borderRadius: '2.5%', padding: '5%' }}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1">
            {letter.tags.map((tag) => (
              // change href to the correct path for filtering by tag
              // <Link href="/list" key={tag}>
              <Link href={`/list?tag=${tag}`} key={tag}>
                <Badge
                  key={tag}
                  className="text-white rounded-pill"
                  style={{ fontSize: '10px' }}
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text style={{ paddingBottom: '5%', borderBottom: '1px solid #d3d3d3' }}>
          {letter.text}
          <br />
          <br />
          <strong>From: </strong>
          <strong>{letter.signature}</strong>
        </Card.Text>
        <ListGroup variant="flush">
          {replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
        </ListGroup>
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-between">
          { /* show reply button only if the user is viewing from letter board */ }
          {showReplyButton && (
            <Col xs="auto">
              <Button variant="primary" href={`reply/${letter.id}`}>Reply</Button>
            </Col>
          )}

          { (session?.user?.email === letter.owner || (session?.user as any)?.randomKey === 'ADMIN') && (
          // only shows edit and delete buttons if the current user is the owner of the letter or admin.
            <>
              <Col xs="auto" className="mt-2">
                <Link href={`edit/${letter.id}`}>Edit</Link>
              </Col>
              <Col xs="auto">
                <Button onClick={handleShowModal}>
                  Delete
                </Button>
              </Col>
            </>
          )}
        </Row>
      </Card.Footer>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this letter?
        </Modal.Body>
        <Modal.Footer>
          <strong className="me-auto">You cannot undo this action</strong>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

    </Card>
  );
};
export default LetterCard;
