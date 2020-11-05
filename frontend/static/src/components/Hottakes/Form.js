import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      title: '',
      text: '',
    }

    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  createPost(evt) {
    evt.preventDefault();

    fetch('/api/v1/hottakes/' ,{
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  render() {
    return (
      <form onSubmit={this.createPost} className="col-md-10">
        <div className="form-group">
          <label htmlFor="title">Title for the Post:</label>
          <input id="title" name="title" value={this.state.title}  onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="text">Content:</label>
          <textarea id="text" name="text" value={this.state.text} onChange={this.handleChange} className="form-control" rows="7"cols="25"></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
    );
  }
}

export default Form;
