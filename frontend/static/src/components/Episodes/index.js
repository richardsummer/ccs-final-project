import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

class Episodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currently_playing: ''
    }
  }

  async componentDidMount() {
    const response = await fetch('/api/v1/spotify_show_episodes/');
    const data = await response.json();
    console.log(data);
    this.setState({episodes: data.items, currently_playing: data.items[0].id});
  }



  render() {
    const episodes = this.state.episodes.slice(1);
    const episodesHTML = episodes.map(episode => <div key={episode.id}>{episode.name}</div>)
    return(
      <React.Fragment>
        <div className="container" width="75%">
          <div className="row">
            <iframe src={`https://open.spotify.com/embed-podcast/episode/${this.state.currently_playing}`} title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div className="row">
            <div className="col-8 episodes">
                <h2>Episodes</h2>
                {episodesHTML}
            </div>
            <div className="col-4 notes">
              <h2>Notes</h2>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}



export default Episodes;
