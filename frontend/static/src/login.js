import React, { Component } from 'react';
import './App.css';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    fetch('api/v1/rest-auth/login/' ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })

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

          <label>Password</label>
          <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />

          <input type="submit" value="Log In" data-test="submit" />
        </form>
      </div>
    );
  }
}

export default Login;