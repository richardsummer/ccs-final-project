import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, ListGroup } from 'react-bootstrap';


class Episodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currently_playing: '',
      notes: [],
    }

    this.fetchNotes = this.fetchNotes.bind(this);
    this.selectEpisode = this.selectEpisode.bind(this);
  }

  async componentDidMount() {
    const response = await fetch('/api/v1/spotify_show_episodes/');
    const data = await response.json();
    console.log(data);
    this.setState({episodes: data.items, currently_playing: data.items[0].id});
    console.log('currently_playing', data.items[0].id);
    this.fetchNotes();
  }

  selectEpisode(episode) {
    this.setState({currently_playing: episode}, this.fetchNotes);
  }

  async fetchNotes() {
    const response = await fetch(`/api/v1/episodes/${this.state.currently_playing}/notes/`);
    const data = await response.json();
    this.setState({notes: data});
  }



  render() {
    // const episodes = this.state.episodes.filter(episode => episode.id !== this.state.currently_playing);
    const episodesHTML = this.state.episodes.map(episode => <ListGroup.Item className="episode-link" variant="light" key={episode.id} onClick={() => this.selectEpisode(episode.id)}>{episode.name}</ListGroup.Item>)
    const notes = this.state.notes.map(note => <div key={note.id}>{note.text}</div>);

    return(
      <React.Fragment>
        <div className="container pt-5" width="100%">
          <div className="row player-box">
            {this.state.currently_playing && <iframe src={`https://open.spotify.com/embed-podcast/episode/${this.state.currently_playing}`} title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>}
          </div>
          <div className="row">
            <div className="col-12 col-md-8 mt-3" variant="flush">
              <ListGroup variant="flush">
                <ListGroup.Item className="list-items">
                  {notes}
                </ListGroup.Item>
              </ListGroup>
            </div>
            <ListGroup className="col-12 col-md-4 mt-3" variant="light">
                <ListGroup.Item className="list-items">
                  {episodesHTML}
                </ListGroup.Item>
            </ListGroup>
          </div>
        </div>
      </React.Fragment>
    )
  }

}



export default Episodes;
