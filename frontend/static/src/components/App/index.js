import React from "react";
import './App.css';
import Register from './../Register';
import Login from './../Login';
import Nav from './../Nav';

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
    }

    this.handleAuth = this.handleAuth.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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
          </Switch>

        </React.Fragment>

    );
  }
}

export default withRouter(App);
