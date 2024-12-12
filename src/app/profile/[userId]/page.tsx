/* eslint-disable max-len */
import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BoxArrowInUpRight } from 'react-bootstrap-icons';
import getUserData from '@/lib/getUserData';
import Link from 'next/link';

/** Profile page showing user's posts, replies, and counts. */
export default async function ProfilePage({ params }: { params: { userId: string } }) {
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const { posts, replies, postCount, replyCount } = await getUserData(params.userId);
  return (
    <main>
      <Container
        id="profile"
        fluid
        className="py-4"
        style={{
          backgroundColor: '#fff8e6', // Soft beige background
          minHeight: '100vh',
        }}
      >
        <Container>
          <Row className="mb-4 text-center">
            <h2 style={{ color: '#d76b00', fontWeight: 'bold' }}>Your Profile</h2>
          </Row>

          <Row className="mb-4 text-center">
            <Col>
              <h3 style={{ color: '#d76b00', fontWeight: '600' }}>Change Signature</h3>
            </Col>
          </Row>

          <Row className="mb-4 text-center justify-content-center">
            <Col
              xs={5}
              className="p-3"
              style={{
                backgroundColor: '#FFF',
                color: '#5e4a3c',
                border: '1px solid #D1BFA7', // Soft neutral border
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ color: '#5e4a3c' }}>Posts</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>{postCount}</p>
            </Col>
            <Col
              xs={5}
              className="p-3 ms-3"
              style={{
                backgroundColor: '#FFF',
                color: '#5e4a3c',
                border: '1px solid #D1BFA7', // Soft neutral border
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              }}
            >
              <h4 style={{ color: '#5e4a3c' }}>Replies</h4>
              <p style={{ fontSize: '1.5rem', fontWeight: '500' }}>{replyCount}</p>
            </Col>
          </Row>

          <h3 className="mt-5 text-center" style={{ color: '#d76b00', fontWeight: 'bold' }}>
            Your Posts
          </h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {posts.map((post) => (
              <Col key={post.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FFF', // Subtle warm background
                    border: '1px solid #D1BFA7',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  <Link href={`/reply/${post.id}`} passHref className="link-toggle no-underline" style={{ color: 'black' }}>
                    <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                      {post.text}
                      <BoxArrowInUpRight className="mb-2 ms-2" width="9px" />
                    </p>
                  </Link>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    <strong>Tags: </strong>
                    {post.tags.join(', ')}
                  </p>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    {new Date(post.createdAt).toLocaleDateString('en-US')}
                  </p>
                </div>
              </Col>
            ))}
          </Row>

          <h3 className="mt-5 text-center" style={{ color: '#d76b00', fontWeight: 'bold' }}>
            Your Replies
          </h3>
          <Row xs={1} md={2} lg={3} className="g-4">
            {replies.map((reply) => (
              <Col key={reply.id} className="d-flex">
                <div
                  className="p-3 w-100"
                  style={{
                    backgroundColor: '#FFF', // Subtle warm background
                    border: '1px solid #D1BFA7',
                    borderRadius: '12px',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {/* redirects to the specific letter's reply page */}
                  <Link href={`/reply/${reply.letterId}`} passHref className="link-toggle no-underline" style={{ color: 'black' }}>
                    <p style={{ fontSize: '1rem', lineHeight: '1.5' }}>
                      {reply.reply}
                      <BoxArrowInUpRight className="mb-2 ms-1" width="8px" />
                    </p>
                  </Link>
                  <p className="text-muted" style={{ fontSize: '0.85rem', marginTop: '1rem' }}>
                    {new Date(reply.createdAt).toLocaleDateString('en-US')}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </Container>
    </main>
  );
}
