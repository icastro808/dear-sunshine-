'use client';

import { Letter, Reaction, Reply, User } from '@prisma/client';
import Link from 'next/link';
import swal from 'sweetalert';
import { Pagination, Card, ListGroup, Button, Modal, Row, Col, Badge } from 'react-bootstrap';
// eslint-disable-next-line max-len
import { ChatLeftHeart, EmojiSmile, EmojiSmileFill, HandThumbsUp, HandThumbsUpFill, Heart, HeartFill } from 'react-bootstrap-icons';
import { addReaction, deleteLetter, deleteReaction } from '@/lib/dbActions';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import ReplyItem from './ReplyItem';
import styles from './LetterCard.module.css';

const LetterCard = ({
  letter, replies, showReplyButton = true, initialReaction,
}: {
  letter: Letter; replies: Reply[]; showReplyButton: boolean, initialReaction: Reaction[] }) => {
  // state to control the visibility of the modal
  const [showModal, setShowModal] = useState(false);

  // state to control the current page of replies
  const [currentPage, setCurrentPage] = useState(1);

  // max replies shown allowed per page
  const REPLIES_PER_PAGE = 2;

  // state to store the reactions for the current letter
  const [reactions, setReactions] = useState<Reaction[]>(initialReaction || []);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        // fetch the reactions for the current letter
        const response = await fetch(`/api/reactions/${letter.id}`);

        if (response.ok) {
          // set the reactions state with the fetched data
          const data = await response.json();
          setReactions(data);
        } else {
          console.error('Failed to fetch reactions');
        }
      } catch (error) {
        console.error('An error occurred while fetching reactions', error);
      }
    };
    fetchReactions();
  }, [letter.id]);

  // retrieves the current session
  const { data: session } = useSession();

  // retrieve the current user and get the user's id
  const user = session?.user as User;
  const userInt = user?.id as number;

  // handles adding or removing a reaction
  const handleReaction = async (reactionType: string, hasReacted: boolean) => {
    try {
      // check if user has already reacted
      if (hasReacted) {
        // if so, remove the reaction
        await deleteReaction({
          letterId: letter.id,
          userId: Number(userInt),
          type: reactionType,
        });

        // update the reactions state
        setReactions((prev) => prev.filter(
          (r) => !(r.owner === session?.user?.email && r.type === reactionType),
        ));
        // console.log('Reaction removed successfully'); // debugging purposes
      } else {
        // add the reaction
        await addReaction({
          letterId: letter.id,
          userId: Number(userInt),
          type: reactionType,
          owner: session?.user?.email as string, // just to be safe
        });

        // update the reactions state with the previous reactions + the new one
        setReactions((prev) => [
          ...prev,
          {
            owner: session?.user?.email as string,
            letterId: letter.id,
            userId: Number(userInt),
            type: reactionType,
          },
        ]);
        // console.log('Reaction added successfully'); // debugging purposes;
      }
    } catch (error) {
      // swal('Error', 'Failed to handle reaction', 'error'); // debugging purposes
      console.error('An error occurred with the reaction', error);
    }
  };

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

  // deletes the letter
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

  // icons for the reactions, both default and filled
  const reactionIcons: { [key: string]: { default: JSX.Element; filled: JSX.Element } } = {
    heart: { default: <Heart />, filled: <HeartFill /> },
    thumbsUp: { default: <HandThumbsUp />, filled: <HandThumbsUpFill /> },
    smile: { default: <EmojiSmile />, filled: <EmojiSmileFill /> },
  };

  // options for the reactions
  const reactionOptions = ['heart', 'thumbsUp', 'smile'];

  return (
    <Card
      style={{ borderRadius: '2.5%', padding: '5%', minWidth: '100%', boxShadow: '0 3px 6px rgb(255, 233, 190)' }}
    >
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

        <Card.Text className="d-flex justify-content-end">
          {reactionOptions.map((reactionType) => {
            const hasReacted = reactions?.some(
              (r) => r.owner === session?.user?.email && r.type === reactionType,
            ) ?? false;

            return (
              <Button
                key={reactionType}
                variant={hasReacted ? 'primary' : 'outline-primary'}
                onClick={() => handleReaction(reactionType, hasReacted)}
                className={styles.reactionButton}
                style={{ marginBottom: '20px' }}
                aria-label={`React with ${reactionType}`}
              >
                {hasReacted ? reactionIcons[reactionType].filled : reactionIcons[reactionType].default}
                &nbsp;
                {reactions?.filter((r) => r.type === reactionType).length || ''}
              </Button>

            );
          })}
        </Card.Text>
        <hr />

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
              <Button variant="primary" href={`reply/${letter.id}`} className={styles.submitBtn}>
                Reply
                &nbsp;
                <ChatLeftHeart />
              </Button>
            </Col>
          )}

          { (session?.user?.email === letter.owner || (session?.user as any)?.randomKey === 'ADMIN') && (
          // only shows edit and delete buttons if the current user is the owner of the letter or admin.
            <>
              <Col xs="auto">
                <Link href={`/edit/${letter.id}`} passHref>
                  <Button className={styles.submitBtn}>
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
