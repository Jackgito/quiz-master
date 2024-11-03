import React, { useState, useEffect } from 'react';
import { Navbar as RsNavbar, Nav, Avatar, Modal, toaster, Message, Dropdown } from 'rsuite';
import SignUpForm from './signUpForm';
import SignInForm from './signInForm';
import './index.css';

const Navbar = (props) => {
  const [active, setActive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);

  useEffect(() => {
    // Check if userId is in session storage
    const userId = sessionStorage.getItem('userId');
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSignInClick = () => {
    setIsSignUp(false);
    setShowModal(true);
  };

  const handleSignUpClick = () => {
    setIsSignUp(true);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    setShowModal(false);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userId');
    setIsLoggedIn(false);
    toaster.push(<Message type="info">Logged out successfully</Message>, { placement: 'topCenter' });
  };

  const onSelect = (eventKey) => {
    setActive(eventKey);
  };

  return (
    <>
      <RsNavbar className="sticky-navbar" {...props}>
        <RsNavbar.Brand href="/" className="navBrand">Quiz Masters</RsNavbar.Brand>
        
        <div className="nav-center">
          <Nav onSelect={onSelect} activeKey={active} className="nav">
            <Nav.Item href="/">Home</Nav.Item>
            <Nav.Item href="/leaderboard">Leaderboard</Nav.Item>
            <Dropdown
              renderToggle={(props, ref) => (
                <Avatar {...props} ref={ref} size="sm" className="avatar" />
              )}
            >
              {isLoggedIn ? (
                <Dropdown.Item onClick={handleLogout}>Log out</Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item onClick={handleSignUpClick}>Sign up</Dropdown.Item>
                  <Dropdown.Item onClick={handleSignInClick}>Sign in</Dropdown.Item>
                </>
              )}
            </Dropdown>
          </Nav>
        </div>

      </RsNavbar>

      <Modal open={showModal} onClose={handleClose} size="xs" backdrop="static" centered>
        <Modal.Header>
        <Modal.Title>{isSignUp ? 'Sign Up' : 'Sign In'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignUp ? <SignUpForm onSubmit={handleSubmit} /> : <SignInForm onSubmit={handleSubmit} />}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;