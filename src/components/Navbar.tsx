'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, Lock, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { User } from '@prisma/client';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const userWithRole = session?.user as { email: string; randomKey: string };
  const role = userWithRole?.randomKey;
  const pathName = usePathname();
  const user = session?.user as User;

  return (
    <Navbar
      expand="lg"
      style={{
        background: 'linear-gradient(90deg, #FFF8DC, #FAFAD2)', // Soft yellow gradient
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // Gentle shadow
        borderBottom: '2px solid #FFD700', // Soft gold bottom border
      }}
    >
      <Container>
        <Navbar.Brand
          href="/"
          style={{
            // fontFamily: 'Georgia, serif',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#F9A602', // Soft orange-yellow
          }}
        >
          Dear Sunshine
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            {currentUser && (
              <>
                <Nav.Link
                  id="add-stuff-nav"
                  href="/add"
                  active={pathName === '/add'}
                  style={{
                    color: pathName === '/add' ? '#F9A602' : '#FFCC66',
                    fontWeight: '500',
                  }}
                >
                  Write Letter
                </Nav.Link>
                <Nav.Link
                  id="list-stuff-nav"
                  href="/list"
                  active={pathName === '/list'}
                  style={{
                    color: pathName === '/list' ? '#F9A602' : '#FFCC66',
                    fontWeight: '500',
                  }}
                >
                  Letter Board
                </Nav.Link>
                <Nav.Link
                  id="mental-health-nav"
                  href="/health"
                  active={pathName === '/health'}
                  style={{
                    color: pathName === '/health' ? '#F9A602' : '#FFCC66',
                    fontWeight: '500',
                  }}
                >
                  Feeling Down?
                </Nav.Link>
                <Nav.Link
                  id="profile-nav"
                  href={`/profile/${user.id}`}
                  active={pathName === `/profile/${user.id}`}
                  style={{
                    color: pathName === `/profile/${user.id}` ? '#F9A602' : '#FFCC66',
                    fontWeight: '500',
                  }}
                >
                  Profile
                </Nav.Link>
              </>
            )}
            {currentUser && role === 'ADMIN' && (
              <Nav.Link
                id="admin-stuff-nav"
                href="/admin"
                active={pathName === '/admin'}
                style={{
                  color: pathName === '/admin' ? '#F9A602' : '#FFCC66',
                  fontWeight: '500',
                }}
              >
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {session ? (
              <NavDropdown
                id="login-dropdown"
                title={currentUser}
                bsPrefix="custom-dropdown"
                style={{
                  color: '#d76b00',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
                menuVariant="light"
              >
                <div
                  style={{
                    borderRadius: '5px',
                  }}
                >
                  <NavDropdown.Item
                    id="login-dropdown-sign-out"
                    href="/api/auth/signout"
                    style={{
                      color: '#FFCC66',
                      fontWeight: '500',
                      backgroundColor: '#FFF',
                    }}
                  >
                    <BoxArrowRight style={{ marginRight: '5px' }} />
                    Sign Out
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="login-dropdown-change-password"
                    href="/auth/change-password"
                    style={{
                      color: '#FFCC66',
                      fontWeight: '500',
                      backgroundColor: '#FFF',
                    }}
                  >
                    <Lock style={{ marginRight: '5px' }} />
                    Change Password
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            ) : (
              <NavDropdown
                id="login-dropdown"
                title="Login"
                bsPrefix="custom-dropdown"
                style={{
                  color: '#d76b00',
                  fontWeight: 'bold',
                  textDecoration: 'none',
                }}
                menuVariant="light"
              >
                <div
                  style={{
                    borderRadius: '5px',
                  }}
                >
                  <NavDropdown.Item
                    id="login-dropdown-sign-in"
                    href="/auth/signin"
                    style={{
                      color: '#FFCC66',
                      fontWeight: '500',
                      backgroundColor: '#FFF',
                    }}
                  >
                    <PersonFill style={{ marginRight: '5px' }} />
                    Sign in
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    id="login-dropdown-sign-up"
                    href="/auth/signup"
                    style={{
                      color: '#FFCC66',
                      fontWeight: '500',
                      backgroundColor: '#FFF',
                    }}
                  >
                    <PersonPlusFill style={{ marginRight: '5px' }} />
                    Sign up
                  </NavDropdown.Item>
                </div>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
