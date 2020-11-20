import React, { Component } from 'react';
import {Form} from 'react-bootstrap';
import Cookies from 'js-cookie';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      notes: [],
      show_id: 'Select',
      text: '',
      timestamp: '',
    }

    this.handleInput = this.handleInput.bind(this);
    this.addNote = this.addNote.bind(this);
  }

  addNote() {
    // console.log('here');

    fetch(`/api/v1/episodes/${this.state.show_id}/notes/` ,{
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: this.state.text,
        timestamp: this.state.timestamp,
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const notes = [...this.state.notes, data];
        this.setState({notes});
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  handleInput(e) {
    console.log('firing')
    this.setState({[e.target.name]: e.target.value});
  }

  async componentDidMount() {
    const response = await fetch('/api/v1/episodes/');
    const data = await response.json();
    console.log(data);
    this.setState({episodes: data});
  }

  render() {
    console.log(this.state.episodes);
    const options = this.state.episodes.map(episode => <option value={episode.show_id}>{episode.title}</option>);
    console.log(options);
    const notes = this.state.notes.map(note => <div><strong>{note.timestamp}</strong>  {note.text}</div>)
    return(
      <div className="container form-container mt-5 mb-5 pt-3 pb-3 border border-secondary rounded">
      <form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Select Episode</Form.Label>

          <select name="show_id" className="form-control" onChange={this.handleInput}>
            <option>Select episode</option>
            {options}
          </select>
          <input className="form-control" type="text" name="timestamp" value={this.state.timestamp} onChange={this.handleInput}/>
          <input className="form-control" type="text" name="text" value={this.state.text} onChange={this.handleInput}/>
          <button type="button" className="btn btn-success" onClick={this.addNote}>Add</button>
      </Form.Group>
      </form>
      {notes}
      </div>
    );
  }
}

export default Note
