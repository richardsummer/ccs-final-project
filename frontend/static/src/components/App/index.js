import React from "react";
import './App.css';
import Form from './../Hottakes/Form.js';
import Register from './../Register';
import Login from './../Login';
import About from './../About';
import Nav from './../Nav';
import Hottakes from './../Hottakes';

import Cookies from 'js-cookie';

import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";

class App extends React.Component {

  constructor(props){
    super(props);

    this.state = {
      isAuth: !!Cookies.get('Authorization'),
      hottakes: [],
      title: '',
      text: '',
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({text: this.state.text}),
    }

    fetch(`api/v1/hottakes/new/`, options)
      .then(response => response.json())
      .then(data => this.setState({hottakes: [data, ...this.state.hottakes], text: ''}));
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentDidMount() {
    fetch('api/v1/hottakes/')
    .then(response => response.json())
    .then(data => this.setState({hottakes: data}));
  }

  handleAuth(isAuth) {
    // isAuth is an object, e.g. {isAuth: true}
    this.setState(isAuth)
  }

  handleLogout() {
    console.log('here');
    fetch('api/v1/rest-auth/logout/' ,{
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
      .then(response => response.json())
      .then(data => {
        if(data.detail === "Successfully logged out.") {
          console.log('firing')
          Cookies.remove('Authorization');
          localStorage.removeItem('user');
          this.setState({isAuth: false});
          this.props.history.push('/login');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    return this.setState({ error: '' });
  }

  render() {

    return (
        <React.Fragment>
          <Nav isAuth={this.state.isAuth} handleLogout={this.handleLogout}/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/register' render={(props) => <Register {...props} isAuth={this.state.isAuth} handleAuth={ this.handleAuth } />} />
            <Route path='/login' render={(props) => <Login {...props} isAuth={this.state.isAuth} handleAuth={ this.handleAuth } />} />
            <Route path='/hottakes/new' component={Form} />
            <Route path='/hottakes/' component={Hottakes} />
            <Route path='/about' render={About} />
          </Switch>

        </React.Fragment>

    );
  }
}

export default withRouter(App);
