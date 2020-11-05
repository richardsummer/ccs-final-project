import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink to="/home" className="navbar-brand">4 Verticals Podcast</NavLink>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink to="/home" className="nav-item nav-link">Home <span className="sr-only">(current)</span></NavLink>
          <NavLink to="/about" className="nav-item nav-link">About</NavLink>
          <NavLink to="/hottakes" className="nav-item nav-link">Hot Takes</NavLink>
          <NavLink to="/episodes" className="nav-item nav-link">Episodes</NavLink>
          {props.isAuth
          ? <button onClick={props.handleLogout}>Logout</button>
          :
          <NavLink to="/login" className="nav-item nav-link">Login</NavLink>
        }
          <NavLink to="/hottakes/new" className="nav-item nav-link">New Post</NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Nav;


//
// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <a className="navbar-brand" href="http://127.0.0.1:3000/">4 Verticals</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav">
//       <li className="nav-item active">
//         <NavLink to="/about">About</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/hottakes">Hot Takes</NavLink>
//       </li>
//       <li className="nav-item">
//         <NavLink to="/episodes">Episodes</NavLink>
//       </li>
//       <li className="nav-item">
//       {props.isAuth
//       ? <button onClick={props.handleLogout}>Logout</button>
//       :
//         <NavLink to="/login">Login</NavLink>
//     }
//       <NavLink to="/hottakes/new">New Post</NavLink>
//       </li>
//     </ul>
//   </div>
// </nav>
