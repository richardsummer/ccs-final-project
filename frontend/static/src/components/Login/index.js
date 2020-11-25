import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {NavLink} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',

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
        'X-CSRFToken': Cookies.get('csrftoken'),
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
          this.props.history.push('/hottakes/');
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

  logout = () => {
    // Cookies.remove('id', 'name', 'email');
    // window.localStorage.clear();
    // window.location.href = "http://127.0.0.1:3000/"
  }

  render() {

    return (
      <div className="container login-container border border-dark rounded mt-5 mb-5 pt-5 pb-5 pl-5 pr-5">
        <Form onSubmit={this.handleSubmit}>
        {
              this.state.error &&
              <h3 data-test="error" onClick={this.dismissError}>
                <button onClick={this.dismissError}>✖</button>
                {this.state.error}
              </h3>
            }
            <h2 className="pb-3">Login</h2>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control type="username" name="username" value={this.state.username} onChange={this.handleChange} required placeholder="Enter username" size="lg" />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} required size="lg" />
          </Form.Group>

          <Button className="mt-3" variant="primary" type="submit" value="Log In" data-test="submit" size="lg">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}

export default Login;
