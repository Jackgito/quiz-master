import React, { useState, useEffect } from 'react';
import { Navbar as RsNavbar, Nav, Avatar, Modal, toaster, Message } from 'rsuite';
import SignUpForm from './signUpForm';
import SignInForm from './signInForm';
import ProfileModal from './profileModal';
import './index.css';

const Navbar = (props) => {
  const [active, setActive] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    // Check if userId is in session storage
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
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

  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleProfileClose = () => {
    setShowProfileModal(false);
  };

  return (
    <>
      <RsNavbar className="sticky-navbar" {...props}>
        <RsNavbar.Brand href="/" className="navBrand">Quiz Masters</RsNavbar.Brand>
        
        <div className="nav-center">
          <Nav onSelect={onSelect} activeKey={active} className="nav">
            <Nav.Item href="/">Home</Nav.Item>
            <Nav.Item href="/leaderboard">Leaderboard</Nav.Item>
            <Nav.Menu
              title={<Avatar size="sm" className="avatar" />}
            >
              {isLoggedIn ? (
                <>
                  <Nav.Item onClick={handleProfileClick}>Profile</Nav.Item>
                  <Nav.Item onClick={handleLogout}>Log out</Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item onClick={handleSignUpClick}>Sign up</Nav.Item>
                  <Nav.Item onClick={handleSignInClick}>Sign in</Nav.Item>
                </>
              )}
            </Nav.Menu>
          </Nav>
        </div>
      </RsNavbar>

      <Modal open={showModal} onClose={handleClose} size="xs" backdrop="static">
        <Modal.Header>
          <Modal.Title>{isSignUp ? 'Sign Up' : 'Sign In'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isSignUp ? <SignUpForm onSubmit={handleSubmit} /> : <SignInForm onSubmit={handleSubmit} />}
        </Modal.Body>
      </Modal>

      <ProfileModal open={showProfileModal} onClose={handleProfileClose} />
    </>
  );
};

export default Navbar;