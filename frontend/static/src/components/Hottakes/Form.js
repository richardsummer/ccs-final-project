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

    const formData = new FormData();
    formData.append('image', this.state.image);
    formData.append('title', this.state.title);
    formData.append('text', this.state.text);

    fetch('/api/v1/hottakes/' ,{
      method: 'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData,
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
    const formData = new FormData()
    formData.append('title', this.state.title);
    formData.append('text', this.state.text);
    // console.log('no image yet')
    if(this.state.image) {
      // console.log('image added');
      formData.append('image', this.state.image);
    }
    await fetch(`/api/v1/hottakes/${id}/` ,{
      method: 'PATCH',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
      },
      body: formData
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
        <Form onSubmit={this.state.isEditing ? this.updatePost : this.createPost} className="col-lg-12 pt-5 pb-5 pr-5 pl-5">
            <Form.Label className="fine-print">Title</Form.Label>
            <Form.Control className="mb-3" placeholder="Title" size="lg" id="title" name="title" value={this.state.title} onChange={this.handleChange}/>
            <Form.Label className="fine-print">Body</Form.Label>
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Control placeholder="Content" size="lg" id="text" name="text" value={this.state.text} onChange={this.handleChange} as="textarea" rows={15} />
            </Form.Group>

          <Form.File className="btn mb-3" name="image" onChange={this.handleImage} />

          {this.state.isEditing
            ?
            <React.Fragment>
              <Button type="submit" className="btn btn-primary" size="lg" block>Save</Button>
              <Button type="button" onClick={this.removePost} variant="danger" size="lg" block>Delete</Button>
            </React.Fragment>
            :
            <Button type="submit" className="btn btn-primary" size="lg" block>Create</Button>
          }

        </Form>
      </div>
    );
  }
}

export default NewHotTake;
