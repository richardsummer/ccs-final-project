import React, { useState } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

const TopNav = (props) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="top-nav">
      <Navbar color="faded" light>
        <NavbarBrand href="/" className="mr-auto">4 Verticals Podcast</NavbarBrand>
        <NavbarToggler onClick={toggleNavbar} className="mr-2" />
        <Collapse isOpen={!collapsed} navbar>
          <Nav navbar>
            <NavItem>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
              <NavLink href="hottakes/">Hot Takes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="episodes/">Episodes</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="about/">About</NavLink>
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

// import React from 'react';
// import { NavLink } from 'react-router-dom';
//
// function Nav(props) {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <NavLink to="/home" className="navbar-brand">4 Verticals Podcast</NavLink>
//       <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
//         <span className="navbar-toggler-icon"></span>
//       </button>
//       <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//         <div className="navbar-nav">
//           <NavLink to="/home" className="nav-item nav-link">Home <span className="sr-only">(current)</span></NavLink>
//           <NavLink to="/about" className="nav-item nav-link">About</NavLink>
//           <NavLink to="/hottakes" className="nav-item nav-link">Hot Takes</NavLink>
//           <NavLink to="/episodes" className="nav-item nav-link">Episodes</NavLink>
//           {props.isAuth
//           ? <button onClick={props.handleLogout}>Logout</button>
//           :
//           <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
//         }
//           <NavLink to="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
//         </div>
//       </div>
//     </nav>
//   );
// }
//
// export default Nav;
