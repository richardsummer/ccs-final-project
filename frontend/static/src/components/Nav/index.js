import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav(props) {
  return (
    <nav>
      <ul>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/hottakes">Hot Takes</NavLink>
        <NavLink to="/episodes">Episodes</NavLink>
        {props.isAuth
        ? <button onClick={props.handleLogout}>Logout</button>
        :
          <NavLink to="/login">Login</NavLink>
      }
        <NavLink to="/hottakes/new">New Post</NavLink>
      </ul>
    </nav>
  );
}

export default Nav;


// <nav>
//   <ul>
//     <li>
//       <Link to="/">Home</Link>
//     </li>
//     <li>
//       <Link to="/about">About</Link>
//     </li>
//     <li>
//       <Link to="/hottakes">Hot Takes</Link>
//     </li>
//     <li>
//       <Link to="/episodes">Episodes</Link>
//     </li>
//     <li>
//       <Link to="/login">Login</Link>
//     </li>
//     <li>
//       <Link to="/register">Register</Link>
//     </li>
//   </ul>
// </nav>
