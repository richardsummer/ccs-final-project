import React, {Component} from 'react';

import { Button, Card, CardColumns, Container, Jumbotron, Modal } from 'react-bootstrap';



class Hottake extends Component {
  render() {
    return(
      <Card style={{ width: '22rem' }}>
      <Card.Img variant="top" src={this.props.hottake.img} />
        <Card.Body>
          <Card.Title>{this.props.hottake.title}</Card.Title>
          <Card.Text>
          </Card.Text>
          <Card.Link href="#">Read More</Card.Link>
          <Card.Link href={`/hottakes/edit/${this.props.hottake.id}`}>Edit</Card.Link>
        </Card.Body>
      </Card>
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
    const hottakes = this.props.hottakes.map(hottake => <Hottake key={hottake.id} hottake={hottake} />)

    return(
      <div className="container mt-5">
        <Jumbotron fluid>
          <Container>
            <h1>Hot Takes</h1>
          </Container>
        </Jumbotron>
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
