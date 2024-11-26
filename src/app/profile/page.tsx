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
      >
        <Container>
          <Row className="mb-4 text-center">
            <h2>Your Profile</h2>
          </Row>

          <Row className="mb-4 text-center">
            <Col>
              <h4>Change Signature</h4>
            </Col>
          </Row>

          <Row className="mb-4 text-center justify-content-center">
            <Col
              xs={5}
              className="p-3"
              style={{
                backgroundColor: '#FFF',
                border: '1px solid #CCC',
                borderRadius: '8px',
              }}
            >
              <h4>Posts</h4>
              <p>{postCount}</p>
            </Col>
            <Col
              xs={5}
              className="p-3 ms-3"
              style={{
                backgroundColor: '#FFF',
                border: '1px solid #CCC',
                borderRadius: '8px',
              }}
            >
              <h4>Replies</h4>
              <p>{replyCount}</p>
            </Col>
          </Row>

          <h3 className="mt-5 text-center">Your Posts</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => (
              <Col key={post.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FFF',
                    border: '1px solid #CCC',
                    borderRadius: '8px',
                  }}
                >
                  <p>{post.text}</p>
                  <p className="text-muted">
                    Tags:
                    {post.tags.join(', ')}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <h3 className="mt-5 text-center">Your Replies</h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {replies.map((reply) => (
              <Col key={reply.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FFF',
                    border: '1px solid #CCC',
                    borderRadius: '8px',
                  }}
                >
                  <p>{reply.reply}</p>
                  <p className="text-muted">
                    Created At:
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
