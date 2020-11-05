import React, {Component} from 'react';



class Hottake extends Component {
  render() {
    return(
      <div>{this.props.hottake.text}</div>
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
      this.props.fetchHottakes()
    }
  }

  render() {
    const hottakes = this.props.hottakes.map(hottake => <Hottake key={hottake.id} hottake={hottake} />)
    return(
      <React.Fragment>
        {hottakes}
      </React.Fragment>
    )
  }
}

export default Hottakes;
