import React from 'react';
import { Navbar as RsNavbar, Nav, Avatar } from 'rsuite';
import './index.css';

const Navbar = ({ active, onSelect, ...props }) => (
  <RsNavbar className="sticky-navbar" {...props}>
    <RsNavbar.Brand href="/" className="navBrand">Quiz Masters</RsNavbar.Brand>
    
    <div className="nav-center">
      <Nav onSelect={onSelect} activeKey={active} className="nav">
        <Nav.Item href="/">Home</Nav.Item>
        <Nav.Item href="/leaderboard">Leaderboard</Nav.Item>
        <Nav.Item href="/signIn">Sign in</Nav.Item>
      </Nav>
    </div>

    <Avatar size="sm" className="avatar" />
  </RsNavbar>
);

export default Navbar;