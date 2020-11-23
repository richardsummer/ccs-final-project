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
      <Form className="col-lg-12 pt-5 pb-5 pr-5 pl-5">
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label className="fine-print">Select Episode</Form.Label>
          <select name="show_id" className="form-control fine-print mb-3" onChange={this.handleInput}>
            <option>Select episode</option>
            {options}
          </select>
        <Form.Label className="fine-print">Enter Timestamp</Form.Label>
          <input className="form-control fine-print mb-3" type="text" name="timestamp" size="lg" placeholder="00:00:00 (HH:MM:SS)" value={this.state.timestamp} onChange={this.handleInput}/>
        <Form.Label className="fine-print">Enter Note</Form.Label>
          <input className="form-control fine-print mb-3" type="text" name="text" size="lg" placeholder="Example: Georgia vs Florida" value={this.state.text} onChange={this.handleInput}/>
          <button type="button" className="btn btn-success mt-3 ml-2" size="lg" onClick={this.addNote}>Add</button>
      </Form.Group>
      </Form>
        <p className="fine-print pr-5 pl-5">Example output: <strong>00:03:27</strong> Georgia vs Florida</p>
      {notes}
      </div>
    );
  }
}

export default Note
