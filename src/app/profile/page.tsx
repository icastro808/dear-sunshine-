/* eslint-disable max-len */
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import getUserData from '@/lib/getUserData';

/** Profile page showing user's posts, replies, and counts. */
const ProfilePage = async ({ userId }: { userId: string }) => {
  const { posts, replies, postCount, replyCount } = await getUserData(userId);
  return (
    <main>
      <Container
        id="profile"
        fluid
        className="py-4"
        style={{
          backgroundColor: '#F5F5DC', // Soft beige background
          minHeight: '100vh',
        }}
      >
        <Container>
          <Row className="mb-4 text-center">
            <h2 style={{ color: '#8B6C42', fontWeight: 'bold' }}>Your Profile</h2>
          </Row>

          <Row className="mb-4 text-center">
            <Col>
              <h4 style={{ color: '#A67D5D', fontWeight: '600' }}>Change Signature</h4>
            </Col>
          </Row>

          <Row className="mb-4 text-center justify-content-center">
            <Col
              xs={5}
              className="p-3"
              style={{
                backgroundColor: '#FFF',
                border: '1px solid #D1BFA7', // Soft neutral border
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ color: '#8B6C42' }}>Posts</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>{postCount}</p>
            </Col>
            <Col
              xs={5}
              className="p-3 ms-3"
              style={{
                backgroundColor: '#FFF',
                border: '1px solid #D1BFA7', // Soft neutral border
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ color: '#8B6C42' }}>Replies</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>{replyCount}</p>
            </Col>
          </Row>

          <h3 className="mt-5 text-center" style={{ color: '#A67D5D', fontWeight: 'bold' }}>
            Your Posts
          </h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => (
              <Col key={post.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FAF9F6', // Subtle warm background
                    border: '1px solid #D1BFA7',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{post.text}</p>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    <strong>Tags:</strong> {post.tags.join(', ')}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <h3 className="mt-5 text-center" style={{ color: '#A67D5D', fontWeight: 'bold' }}>
            Your Replies
          </h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {replies.map((reply) => (
              <Col key={reply.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FAF9F6', // Subtle warm background
                    border: '1px solid #D1BFA7',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>{reply.reply}</p>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    <strong>Created At:</strong>{' '}
                    {new Date(reply.createdAt).toLocaleString()}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ProfilePage;
