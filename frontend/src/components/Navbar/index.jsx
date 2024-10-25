import React, { useState } from 'react';
import { Navbar as RsNavbar, Nav, Avatar, Modal } from 'rsuite';
import SignUpForm from './signUpForm';
import './index.css';

const Navbar = ({ active, onSelect, ...props }) => {
  const [showModal, setShowModal] = useState(false);

  const handleSignInClick = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = () => {
    // Handle form submission logic here
    setShowModal(false);
  };

  return (
    <>
      <RsNavbar className="sticky-navbar" {...props}>
        <RsNavbar.Brand href="/" className="navBrand">Quiz Masters</RsNavbar.Brand>
        
        <div className="nav-center">
          <Nav onSelect={onSelect} activeKey={active} className="nav">
            <Nav.Item href="/">Home</Nav.Item>
            <Nav.Item href="/leaderboard">Leaderboard</Nav.Item>
            <Nav.Item onClick={handleSignInClick}>Sign up</Nav.Item>
          </Nav>
        </div>

        <Avatar size="sm" className="avatar" />
      </RsNavbar>

      <Modal open={showModal} onClose={handleClose} size="xs" backdrop="static" centered>
        <Modal.Header>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SignUpForm onSubmit={handleSubmit} onCancel={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navbar;