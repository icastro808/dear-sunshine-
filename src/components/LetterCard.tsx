'use client';

import { Letter, Reply } from '@prisma/client';
import Link from 'next/link';
import swal from 'sweetalert';
import { Pagination, Card, ListGroup, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
import { deleteLetter } from '@/lib/dbActions';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import ReplyItem from './ReplyItem';
import styles from './LetterCard.module.css';

const LetterCard = ({
  letter, replies, showReplyButton = true }: { letter: Letter; replies: Reply[]; showReplyButton: boolean }) => {
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // state to control the current page of replies
  const [currentPage, setCurrentPage] = useState(1);

  // max replies shown allowed per page
  const REPLIES_PER_PAGE = 2;

  // retrieves the current session
  const { data: session } = useSession();

  // makes the modal (confirming deletion popup) visible
  const handleShowModal = () => setShowModal(true);
  // hides the modal
  const handleCloseModal = () => setShowModal(false);

  // calculates the total number of pages based on the number of replies
  const totalPages = Math.ceil(replies.length / REPLIES_PER_PAGE);

  // slices the replies array to show only the replies for the current page
  const paginatedReplies = replies.slice(
    (currentPage - 1) * REPLIES_PER_PAGE,
    currentPage * REPLIES_PER_PAGE,
  );

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

  // handles page change so that the user can navigate through the replies
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Card style={{ borderRadius: '2.5%', padding: '5%', minWidth: '100%' }}>
      <Card.Header>
        <Card.Title className="d-flex justify-content-between align-items-center">
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              maxWidth: '100%',
            }}
          >
            {letter.tags.map((tag) => (
              // change href to the correct path for filtering by tag
              // <Link href={`/list?tags=${tag}`} key={tag}>
              <Badge key={tag} className={styles.badge}>
                {tag}
              </Badge>
            ))}
          </div>
          <p className="fw-lighter mb-0" style={{ fontSize: '0.9rem' }}>
            {new Date(letter.createdAt).toLocaleDateString('en-US')}
          </p>
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text style={{ paddingBottom: '5%', borderBottom: '1px solid #d3d3d3' }}>
          {letter.text}
          <br />
          <br />
          From,
          <br />
          {letter.signature}
        </Card.Text>
        <ListGroup variant="flush">
          {paginatedReplies.map((reply) => <ReplyItem key={reply.id} reply={reply} />)}
        </ListGroup>

        {/* pagination - only shows if more than 2 replies */}
        {totalPages > 1 && (
          <Pagination className="pt-3 custom-pagination" size="sm">
            {/* places prev and next buttons on left and right side of letter card */}
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                style={{ marginLeft: '0' }}
              />
              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
                style={{ marginRight: '0' }}
              />
            </div>
          </Pagination>
        )}
      </Card.Body>
      <Card.Footer>
        <Row className="justify-content-between">
          { /* show reply button only if the user is viewing from letter board */ }
          {showReplyButton && (
            <Col xs="auto">
              <Button variant="primary" href={`reply/${letter.id}`} className={styles.submitBtn}>Reply</Button>
            </Col>
          )}

          { (session?.user?.email === letter.owner || (session?.user as any)?.randomKey === 'ADMIN') && (
          // only shows edit and delete buttons if the current user is the owner of the letter or admin.
            <>
              {/* <Col xs="auto" className="mt-2">
                <Link href={`edit/${letter.id}`}>Edit</Link>
              </Col> */}
              <Col xs="auto">
                <Link href={`edit/${letter.id}`} passHref>
                  <Button onClick={handleShowModal} className={styles.submitBtn}>
                    Edit
                  </Button>
                </Link>
              </Col>
              <Col xs="auto">
                <Button onClick={handleShowModal} className={styles.submitBtn}>
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
