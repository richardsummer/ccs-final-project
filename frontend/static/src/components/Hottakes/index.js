import React, {Component} from 'react';
import {
  Card, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle
} from 'reactstrap';



class Hottake extends Component {
  render() {
    return(
      <li>{this.props.hottake.text}</li>
    )
  }
}

class Hottakes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hottakes: [],
    }
  }

  componentDidMount() {
    if(!this.props.hottakes.length) {
      this.props.fetchHottakes();
    }
  }

  render() {
    const hottakes = this.props.hottakes.map(hottake => <Hottake key={hottake.id} hottake={hottake} />)

    return(
      <div className="container">
        <div className="row">
          <div className="col-12">

            <Card>
              <CardBody>
                <CardTitle tag="h5">Card title</CardTitle>
                <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
              </CardBody>
              <img width="100%" src="/assets/318x180.svg" alt="Card cap" />
              <CardBody>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <CardLink href="#">Read More</CardLink>
              </CardBody>
            </Card>

            <ul className="list-group">
              {hottakes}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Hottakes;
