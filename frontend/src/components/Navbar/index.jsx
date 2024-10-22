import React from 'react';
import { Navbar as RsNavbar, Nav, Dropdown, Avatar } from 'rsuite';
import './Navbar.css';

const Navbar = ({ active, onSelect, ...props }) => (
  <RsNavbar className="sticky-navbar" {...props}>
    <RsNavbar.Brand href="/" className="navBrand">Quiz Masters</RsNavbar.Brand>
    
    <div className="nav-center">
      <Nav onSelect={onSelect} activeKey={active} className="nav">
        <Nav.Item href="/">Home</Nav.Item>
        <Nav.Item href="/about">About</Nav.Item>
        <Dropdown title="More">
          <Dropdown.Item href="/settings">Settings</Dropdown.Item>
          <Dropdown.Item href="/profile">Profile</Dropdown.Item>
        </Dropdown>
      </Nav>
    </div>

    <Avatar size="sm" className="avatar" />
  </RsNavbar>
);

export default Navbar;