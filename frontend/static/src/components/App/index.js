import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import Form from './../Hottakes/Form.js';
import Register from './../Register';
import Login from './../Login';
import Episodes from './../Episodes/';
import About from './../About';
import Nav from './../Nav';
import Hottakes from './../Hottakes';
import Cookies from 'js-cookie';
import Note from './../Episodes/Notes.js';

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
    this.fetchHottakes = this.fetchHottakes.bind(this);
  }

  fetchHottakes() {
    fetch('/api/v1/hottakes/')
      .then(response => response.json())
      .then(data => this.setState({hottakes: data}));
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
          <div className="top-line">
          </div>
          <Nav isAuth={this.state.isAuth} handleLogout={this.handleLogout}/>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/register' render={(props) => <Register {...props} isAuth={this.state.isAuth} handleAuth={ this.handleAuth } />} />
            <Route path='/login' render={(props) => <Login {...props} isAuth={this.state.isAuth} handleAuth={ this.handleAuth } />} />
            <Route path='/notes/new' component={Note}/>
            <Route path='/hottakes/new' component={Form} />
            <Route path='/hottakes/edit/:id' component={Form} />
            <Route path='/hottakes' render={(props) => <Hottakes {...props} hottakes={this.state.hottakes} fetchHottakes={this.fetchHottakes} />} />
            <Route path='/about' component={About} />
            <Route path='/' component={Episodes} />
          </Switch>
          <footer className="page-footer font-small unique-color-dark pt-4 mt-5">
            <div class="container">
              <div className="row">
                <div className="col-12 social-bar">
                  <i className="fab fa-facebook-f facebook-icon"></i>
                  <i class="fab fa-instagram instagram-icon"></i>
                  <i className="fab fa-twitter twitter-icon"></i>
                  <i className="fab fa-spotify spotify-icon"></i>
                </div>
              </div>
              <ul className="list-unstyled list-inline text-center py-2">

              </ul>


            </div>

            <div class="footer-copyright text-center py-3">© 2020 Copyright, 4 Verticals
            </div>
          </footer>
        </React.Fragment>

    );
  }
}


export default withRouter(App);
