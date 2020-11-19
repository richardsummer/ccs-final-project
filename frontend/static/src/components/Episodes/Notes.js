import React, { Component } from 'react';
import {Form} from 'react-bootstrap';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
    }
  }

  // async componentDidMount() {
  //   const response = await fetch('/api/v1/episodes/');
  //   const data = await response.json();
  //   console.log(data);
  //   this.setState({episodes: data.items});
  // }


  render() {
    console.log(this.state.episodes)
    return(
      <form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Episode</Form.Label>
        <Form.Control as="select">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Form.Control>
      </Form.Group>
      </form>
    );
  }
}

export default Note
