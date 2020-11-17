import React, {Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Card, ListGroup } from 'react-bootstrap';

// class EpisodeList extends Component {
//   render () {
//     return (
//       <Card style={{ width: '18rem' }}>
//         <ListGroup variant="flush">
//           <ListGroup.Item>{this.props.episode.name}</ListGroup.Item>
//         </ListGroup>
//       </Card>
//     )
//   }
// }

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
    const episodesHTML = episodes.map(episode => <ListGroup.Item key={episode.id}>{episode.name}</ListGroup.Item>)
    const notes = this.state.notes.map(note => <div key={note.id}>{note.text}</div>);

    return(
      <React.Fragment>
        <div className="container pt-5" width="100%">
          <div className="row">
            <iframe src={`https://open.spotify.com/embed-podcast/episode/${this.state.currently_playing}`} title="player" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div className="row">
            <div className="col-12">
              <Card>
                <ListGroup.Item className="list-items">
                  {episodesHTML}
                </ListGroup.Item>
              </Card>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

}



export default Episodes;
