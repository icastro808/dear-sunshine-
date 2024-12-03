'use client';

import { Letter, Reply } from '@prisma/client';
import { Card, ListGroup, Modal, Button, Badge } from 'react-bootstrap';
import Link from 'next/link';
import { useState } from 'react';
import { deleteLetter } from '@/lib/dbActions';
import swal from 'sweetalert';
import ReplyItem from './ReplyItem';

const LetterCardAdmin = ({ letter, replies }: { letter: Letter; replies: Reply[] }) => {
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // makes the modal visible
  const handleShowModal = () => setShowModal(true);
  // hides the modal
  const handleCloseModal = () => setShowModal(false);

  const confirmDelete = async () => {
    try {
      await deleteLetter(letter.id, true);
      swal('Success', 'The letter was deleted successfully', 'success');
      handleCloseModal();
    } catch (error) {
      console.error('An error occurred while deleting the letter', error);
      handleCloseModal();
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div className="d-flex gap-1">
            {letter.tags.map((tag) => (
              // change href to the correct path for filtering by tag
              <Link href="/list" key={tag}>
                <Badge
                  key={tag}
                  className={`tag-${tag} text-white`}
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
        <Card.Text>
          {letter.text}
        </Card.Text>
        <ListGroup variant="flush">
          {replies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
        </ListGroup>
        <p className="blockquote-footer text-break" style={{ position: 'relative', zIndex: 1 }}>
          {letter.owner}
        </p>

        <Button variant="danger" onClick={handleShowModal} className="mt-3">
          Delete
        </Button>
      </Card.Body>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this letter?</Modal.Body>
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

export default LetterCardAdmin;
