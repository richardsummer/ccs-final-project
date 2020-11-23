import React, {Component} from 'react';

import { Button, Card, CardColumns, Modal } from 'react-bootstrap';



class Hottake extends Component {

constructor(props) {
  super(props);
  this.state = {
    show: false,
  }

  this.handleClose = this.handleClose.bind(this);
  this.handleShow = this.handleShow.bind(this);
}

handleClose() {
  this.setState({show: false});
}

  handleShow() {
    this.setState({show: true})
  }
  render() {

    const text = this.props.hottake.text
      .split('\n')
      .map(str => str ? <p>{str}</p> : <br/>);
    return(
      <React.Fragment>
      <Card className="border border-secondary rounded" style={{ width: '22rem' }}>
      <Card.Img variant="top" src={this.props.hottake.image} />
        <Card.Body>
          <Card.Title>{this.props.hottake.title}</Card.Title>
          <Card.Text>
          </Card.Text>
          <Button className="btn btn-primary" onClick={this.handleShow}>Read More</Button>
          {this.props.isAuth && <Button className="btn btn-warning ml-3" href={`/hottakes/edit/${this.props.hottake.id}`}>Edit</Button>}
        </Card.Body>
      </Card>
      <Modal
        show={this.state.show}
        onHide={this.handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.props.hottake.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {text}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      </React.Fragment>
      // <li>{this.props.hottake.image}{this.props.hottake.title}{this.props.hottake.text}</li>
    )
  }
}

class Hottakes extends Component {


  componentDidMount() {
    if(!this.props.hottakes.length) {
      this.props.fetchHottakes();
    }
  }

  render() {
    const hottakes = this.props.hottakes.map(hottake => <Hottake key={hottake.id} hottake={hottake} isAuth={this.props.isAuth} />)

    return(
      <div className="container mt-5">
        <CardColumns>
          <div className="row">
            <div className="col-12">
              {hottakes}
            </div>
          </div>
        </CardColumns>
      </div>
    )
  }
}

export default Hottakes;
