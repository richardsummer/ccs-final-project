import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const TopNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="top-nav">
      <Navbar color="faded" dark>
        <NavbarBrand href="/" className="mr-auto">4 Verticals Podcast</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
            <NavItem>
              <NavLink href="/">Episodes</NavLink>
            </NavItem>
                <NavLink href="/hottakes/">Hot Takes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about/">About</NavLink>
            </NavItem>
            {props.isAuth
              ? <button onClick={props.handleLogout}>Logout</button>
              :
              <NavLink href="/login" className="nav-item nav-link">Login</NavLink>
            }
              <NavLink href="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default TopNav;
