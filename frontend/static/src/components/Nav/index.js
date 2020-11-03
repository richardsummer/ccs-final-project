import React from 'react';

function Nav(props) {
  return (
    <nav>
      <h3>Logo</h3>
      <ul>
        <li>About</li>
        <li>Hot Takes</li>
        <li>Episodes</li>
        {props.isAuth
        ? <button onClick={props.handleLogout}>Logout</button>
        :
          <li>Login</li>
      }
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
