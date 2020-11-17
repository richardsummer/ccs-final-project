import React, { useState } from 'react';
// import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,

} from 'reactstrap';

const TopNav = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  //
  // const [collapsed, setCollapsed] = useState(true);
  //
  // const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div>
      <Navbar className="top-nav" dark expand="md">
        <NavbarBrand href="/">4 VERTICALS</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/">Episodes</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/hottakes/">Hot Takes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/about/">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/notes/new/" className="nav-item nav-link">New Note</NavLink>
            </NavItem>
          </Nav>
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
              Profile
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
              {props.isAuth
                ? <button onClick={props.handleLogout}>Logout</button>
                :
                <NavLink href="/login" className="nav-item nav-link">Login</NavLink>
              }
              </DropdownItem>
              <DropdownItem>
                <NavLink href="/register" className="nav-item nav-link">Register</NavLink>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                Reset
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </div>
    // Import these.
    // UncontrolledDropdown,
    // DropdownToggle,
    // DropdownMenu,
    // DropdownItem,
    // NavbarText

    // <NavbarText>Simple Text</NavbarText>
    // <UncontrolledDropdown nav inNavbar>
    //   <DropdownToggle nav caret>
    //     Options
    //   </DropdownToggle>
    //   <DropdownMenu right>
    //     <DropdownItem>
    //       Option 1
    //     </DropdownItem>
    //     <DropdownItem>
    //       Option 2
    //     </DropdownItem>
    //     <DropdownItem divider />
    //     <DropdownItem>
    //       Reset
    //     </DropdownItem>
    //   </DropdownMenu>
    // </UncontrolledDropdown>

    //_________________________//

    // <div className="top-nav">
    //   <Navbar color="faded" dark>
    //     <NavbarBrand href="/" className="mr-auto">4 Verticals Podcast</NavbarBrand>
    //     <NavbarToggler onClick={toggleNavbar} className="mr-2" />
    //     <Collapse isOpen={!collapsed} navbar>
    //       <Nav navbar>
    //         <NavItem>
    //         <NavItem>
    //           <NavLink href="/">Episodes</NavLink>
    //         </NavItem>
    //             <NavLink href="/hottakes/">Hot Takes</NavLink>
    //         </NavItem>
    //         <NavItem>
    //           <NavLink href="/about/">About</NavLink>
    //         </NavItem>
    //         {props.isAuth
    //           ? <button onClick={props.handleLogout}>Logout</button>
    //           :
    //           <NavLink href="/login" className="nav-item nav-link">Login</NavLink>
    //         }
    //           <NavLink href="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
    //           <NavLink href="/notes/new/" className="nav-item nav-link">New Note</NavLink>
    //       </Nav>
    //     </Collapse>
    //   </Navbar>
    // </div>
  );
}

export default TopNav;
