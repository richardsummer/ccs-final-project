import React, { Component } from 'react';
import Cookies from 'js-cookie';

class Form extends Component {

  constructor(props) {
    super(props);

    this.state = {
      image: null,
      preview: '',
      title: '',
      text: '',
      isEditing: false,
    }

    this.createPost = this.createPost.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.removePost = this.removePost.bind(this);
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(evt) {
    let file = evt.target.files[0];
    this.setState({image: file});
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({preview: reader.result})
    }

    reader.readAsDataURL(file);
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
      body: JSON.stringify({
        title: this.state.title,
        text: this.state.text,
        image: this.state.image,
      }),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  updatePost(evt) {
    evt.preventDefault();
    const id = this.props.match.params.id;
    fetch(`/api/v1/hottakes/${id}/` ,{
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: this.state.title, text: this.state.text}),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  removePost(){
    const id = this.props.match.params.id;
    fetch(`/api/v1/hottakes/${id}/` ,{
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    if(id){
      fetch(`/api/v1/hottakes/${id}`)
        .then(response => response.json())
        .then(data => this.setState({...data, isEditing: true}));
    };
  }

  render() {
    return (
      <form onSubmit={this.state.isEditing ? this.updatePost : this.createPost} className="col-md-10">
        <div className="form-group">
          <label htmlFor="title">Title for the Post:</label>
          <input id="title" name="title" value={this.state.title}  onChange={this.handleChange}/>
        </div>

        <div className="form-group">
          <label htmlFor="text">Content:</label>
          <textarea id="text" name="text" value={this.state.text} onChange={this.handleChange} className="form-control" rows="7"cols="25"></textarea>
        </div>

        <input type="file" name="image" onChange={this.handleImage}/>

        {this.state.isEditing
          ?
          <React.Fragment>
            <button type="submit" className="btn btn-primary">Save</button>
            <button type="button" onClick={this.removePost} className="btn btn-primary">Delete</button>
          </React.Fragment>
          :
          <button type="submit" className="btn btn-primary">Create</button>
        }

      </form>
    );
  }
}

export default Form;
