import React, {Component} from 'react';

import { Card, CardColumns } from 'react-bootstrap';



class Hottake extends Component {
  render() {
    return(
      <Card style={{ width: '22rem' }}>
        <Card.Body>
          <Card.Title>{this.props.hottake.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
          <Card.Text>
            {this.props.hottake.text}
          </Card.Text>
          <Card.Link href="#">Read More</Card.Link>
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
