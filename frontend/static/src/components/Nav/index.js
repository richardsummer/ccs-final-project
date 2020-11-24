import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';


const TopNav = (props) => {

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
              <Nav.Link href="/notes/new">New Show Note</Nav.Link>
              <Button onClick={props.handleLogout}>Logout</Button>
            </React.Fragment>
            :
            null
          }

        </Nav>
        <Nav className="social-bar pr-5">
          <a href="https://www.instagram.com/4verticalspod/" target="_blank" rel="noreferrer">
            <i className="mr-3 fab fa-instagram instagram-icon"></i>
          </a>
          <a href="https://twitter.com/4VerticalsPod" target="_blank" rel="noreferrer">
            <i className="mr-3 fab fa-twitter twitter-icon"></i>
          </a>
          <a href="https://open.spotify.com/show/6Verqcb4xk7hVvEM2XCjkv" target="_blank" rel="noreferrer">
            <i className="mr-3 fab fa-spotify spotify-icon"></i>
          </a>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default TopNav;
