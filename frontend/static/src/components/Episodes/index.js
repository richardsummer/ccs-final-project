import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

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

  async selectEpisode(episode) {
    await this.setState({episode});
    this.fetchNote();
  }

  async fetchNotes() {
    const response = await fetch(`/api/v1/episodes/${this.state.currently_playing}/notes/`);
    const data = await response.json();
    this.setState({notes: data});
  }

  render() {
    const episodes = this.state.episodes.filter(episode => episode.id !== this.state.currently_playing);
    const episodesHTML = episodes.map(episode => <div key={episode.id}>{episode.name}</div>)
    const notes = this.state.notes.map(note => <div key={note.id}>{note.text}</div>);
    return(
      <React.Fragment>
        <div className="container pt-5" width="100%">
          <div className="row">
            <iframe src={`https://open.spotify.com/embed-podcast/episode/${this.state.currently_playing}`} title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div className="row pt-2">
            <div className="col-5 border border-right-0 rounded-left border-dark episodes">
              <ul className="list-group">
                {episodesHTML}
              </ul>

            </div>
            <div className="col-7 border border-left-0 rounded-right border-dark notes">
            {notes}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}



export default Episodes;
