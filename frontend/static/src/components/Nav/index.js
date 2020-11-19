import React, { useState } from 'react';
import { Button, Navbar, NavDropdown, Nav } from 'react-bootstrap';


const TopNav = (props) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);
  //
  // const [collapsed, setCollapsed] = useState(true);
  //
  // const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <Navbar className="my-nav" variant="dark" expand="lg">
    <Navbar.Brand className="title-logo" href="/">4 VERTICALS PODCAST</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto pl-5">
          <Nav.Link href="/">Episodes</Nav.Link>
          <Nav.Link href="/hottakes/">Hot Takes</Nav.Link>
          {props.isAuth
            ?
            <React.Fragment>
            <Nav.Link href="/hottakes/new/">New Hot Take</Nav.Link>
            <Nav.Link href="/hottakes/new/">Add Show Notes</Nav.Link>
            <Button onClick={props.handleLogout}>Logout</Button>
            </React.Fragment>
            :
            null
          }

        </Nav>
        <Nav className="pr-5">
        </Nav>
      </Navbar.Collapse>
    </Navbar>
      // <Navbar className="top-nav" dark expand="md">
      //   <a href="/">
      //     <i className="fas fa-football-ball football-icon"></i>
      //   </a>
      //   <NavbarToggler onClick={toggle} />
      //   <Collapse isOpen={isOpen} navbar>
      //     <Nav className="mr-auto" navbar>
      //       <NavItem>
      //         <NavLink href="/">Episodes</NavLink>
      //       </NavItem>
      //       <NavItem>
      //           <NavLink href="/hottakes/">Hot Takes</NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink href="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
      //       </NavItem>
      //       <NavItem>
      //         <NavLink href="/notes/new/" className="nav-item nav-link">New Note</NavLink>
      //       </NavItem>
      //     </Nav>
      //     <UncontrolledDropdown nav inNavbar>
      //       <DropdownToggle className="caret" nav caret>
      //         <i className="fas fa-user user-icon"></i>
      //       </DropdownToggle>
      //       <DropdownMenu right>
      //         <DropdownItem>
              // {props.isAuth
              //   ? <button onClick={props.handleLogout}>Logout</button>
              //   :
              //   <NavLink href="/login" className="nav-item nav-link">Login</NavLink>
              // }
      //         </DropdownItem>
      //         <DropdownItem>
      //           <NavLink href="/register" className="nav-item nav-link">Register</NavLink>
      //         </DropdownItem>
      //         <DropdownItem divider />
      //         <DropdownItem>
      //           Reset
      //         </DropdownItem>
      //       </DropdownMenu>
      //     </UncontrolledDropdown>
      //   </Collapse>
      // </Navbar>
  );
}

export default TopNav;
