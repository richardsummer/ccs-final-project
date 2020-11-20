import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';


class Episodes extends Component {

  constructor(props) {
    super(props);
    this.state = {
      episodes: [],
      currently_playing: '',
      notes: [],
      text: '',
    }
    this.adminPostNote = this.adminPostNote.bind(this);
    this.onChange = this.onChange.bind(this);
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
    console.log(this.state.currently_playing);
  }

  async adminPostNote(e) {
    e.preventDefault()
    const episodeResponse = await fetch('/api/v1/episodes/');
    const episodeData = await episodeResponse.json();
    const episode = episodeData.filter(episode => episode.show_id === this.state.currently_playing)
    console.log(episode)

    const data = {text: this.state.text, episode: episode};
    console.log(data)
    const options = {
      method:'POST',
      headers: {
        'X-CSRFToken': Cookies.get('csrftoken'),
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };
      const response = await fetch(`/api/v1/episodes/${this.state.currently_playing}/notes/`, options);
      const responseData = await response.json();
      console.log(responseData);
  }

  onChange(e) {
    this.setState({[e.target.name]: e.target.value});
  }


  render() {
    // const episodes = this.state.episodes.filter(episode => episode.id !== this.state.currently_playing);
    const episodesHTML = this.state.episodes.map(episode => <ListGroup.Item className="font-weight-bold pt-3 pb-3 border no-border" action variant="dark" key={episode.id} onClick={() => this.selectEpisode(episode.id)}>{episode.name}</ListGroup.Item>)
    const notes = this.state.notes.map(note =>
      <div key={note.id} className="d-flex">
        <strong className="pr-2">{note.timestamp}</strong>
        <p>{note.text}</p>
      </div>
    );

    return(
      <React.Fragment>
        <div className="container pt-5" width="100%">
          <div className="row player-box rounded">
            {this.state.currently_playing && <iframe src={`https://open.spotify.com/embed-podcast/episode/${this.state.currently_playing}`} title="player" width="100%" height="232" frameBorder="0" allowtransparency="true" allow="encrypted-media"></iframe>}
          </div>
          <div className="row">
            <ListGroup.Item className="episode-list col-12 col-md-4 mt-3 border border-dark rounded">
                {episodesHTML}
            </ListGroup.Item>
            <ListGroup.Item className="episode-list col-12 col-md-8 mt-3 border border-dark rounded">
                <h3 className="notes-title mb-2">SHOW NOTES</h3>
                {notes}
            </ListGroup.Item>
          </div>
        </div>
      </React.Fragment>
    )
  }

}



export default Episodes;
