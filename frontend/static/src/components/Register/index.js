import React, { Component } from "react";
import Cookies from 'js-cookie';
import {NavLink} from 'react-router-dom';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password1: '',
      password2: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    fetch('api/v1/rest-auth/registration/' ,{
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'), // => 'value'
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        if(data.key) {
          Cookies.set('Authorization', `Token ${data.key}`);
          localStorage.setItem('user', JSON.stringify(data.user));
          this.props.handleAuth({isAuth: true});
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return this.setState({ error: '' });
  }

  handleChange(e) {
      this.setState({[e.target.name]: e.target.value});
  }

  render() {
    // NOTE: I use data-attributes for easier E2E testing
    // but you don't need to target those (any css-selector will work)

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          <label>User Name</label>
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />

          <label>Email</label>
          <input type="text" name="email" value={this.state.email} onChange={this.handleChange} required />

          <label>Password1</label>
          <input type="password" name="password1" value={this.state.password1} onChange={this.handleChange} required />

          <label>Password2</label>
          <input type="password" name="password2" value={this.state.password2} onChange={this.handleChange} required />
          <input type="submit" value="Register" />
        </form>

        <div className="d-flex align-items-baseline">
          <p className="ml-auto">Already have an account? <NavLink to="/login">Login</NavLink>.</p>
        </div>
      </div>
    );
  }
}

export default Register;