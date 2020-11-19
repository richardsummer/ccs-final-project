import React, { Component } from 'react';
import Cookies from 'js-cookie';
import {Form, Button} from 'react-bootstrap';

class NewHotTake extends Component {

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

  async updatePost(evt) {
    evt.preventDefault();
    const id = this.props.match.params.id;
    await fetch(`/api/v1/hottakes/${id}/` ,{
      method: 'PUT',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title: this.state.title, text: this.state.text}),
    });
    this.props.history.push('/hottakes');
  }

  async removePost(){
    const id = this.props.match.params.id;
    await fetch(`/api/v1/hottakes/${id}/` ,{
      method: 'DELETE',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
    })
    this.props.history.push('/hottakes');

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
      <div className="container form-container mt-5 mb-5 pt-3 pb-3 border border-secondary rounded">
        <Form onSubmit={this.state.isEditing ? this.updatePost : this.createPost} className="col-lg-12">
            <Form.Control className="mb-3" placeholder="Title" size="lg" id="title" name="title" value={this.state.title} onChange={this.handleChange}/>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control placeholder="Content" size="lg" id="text" name="text" value={this.state.text} onChange={this.handleChange} as="textarea" rows={15} />
            </Form.Group>


          <Form.File className="mb-3" name="image" onChange={this.handleImage}/>

          {this.state.isEditing
            ?
            <React.Fragment>
              <Button type="submit" className="btn btn-primary" size="lg" block>Save</Button>
              <Button type="button" onClick={this.removePost} variant="danger" size="lg" block>Delete</Button>
            </React.Fragment>
            :
            <Button type="submit" className="btn btn-primary">Create</Button>
          }

        </Form>
      </div>
    );
  }
}

export default NewHotTake;
